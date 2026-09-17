import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/design-system/buttons";
import { FormError, FormField, FormLabel } from "@/design-system/forms";
import { Input, PasswordInput } from "@/design-system/inputs";
import { Stack } from "@/design-system/layout";
import { Heading, Link, Text } from "@/design-system/typography";

import { usePlatform } from "@/platform/providers";
import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function ResetPasswordPage() {
  const { theme } = useTheme();
  const { authentication } = usePlatform();
  const navigate = useNavigate();

  const email = sessionStorage.getItem("reset_password_email") ?? "";
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError(undefined);
    setSuccess(undefined);

    if (!email) {
      setError("Password reset email is missing. Please start again.");
      return;
    }

    if (code.length !== 6) {
      setError("Enter the 6-digit reset code.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authentication.resetPassword(email, code, password);
      sessionStorage.removeItem("reset_password_email");
      setSuccess("Password reset successfully. You can now sign in.");
      window.setTimeout(() => {
        navigate("/login", { replace: true });
      }, 700);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <Stack spacing={theme.spacing.section}>
        <Stack spacing={theme.spacing.stack} align="center">
          <Heading level={1} align="center">
            Reset your password
          </Heading>

          <Text align="center">
            Enter the reset code sent to your email and choose a new password.
          </Text>
          {email ? <Text align="center">{email}</Text> : null}
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={theme.spacing.form}>
            <FormField
              id="reset-password-code"
              name="code"
              label="Reset code"
              {...(error !== undefined ? { error } : {})}
            >
              <FormLabel />
              <Input
                id="reset-password-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                placeholder="Enter 6-digit code"
                fullWidth
                disabled={loading}
                onChange={(event) => {
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                  setError(undefined);
                }}
              />
              <FormError />
            </FormField>

            <FormField
              id="reset-password"
              name="password"
              label="New password"
              disabled={loading}
            >
              <FormLabel />
              <PasswordInput
                id="reset-password"
                value={password}
                placeholder="Enter your new password"
                required
                fullWidth
                autoComplete="new-password"
                disabled={loading}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(undefined);
                }}
              />
            </FormField>

            <FormField
              id="reset-password-confirm"
              name="confirmPassword"
              label="Confirm password"
              disabled={loading}
            >
              <FormLabel />
              <PasswordInput
                id="reset-password-confirm"
                value={confirmPassword}
                placeholder="Confirm your new password"
                required
                fullWidth
                autoComplete="new-password"
                disabled={loading}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError(undefined);
                }}
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={
                loading ||
                !code ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
            >
              {loading ? "Resetting..." : "Reset password"}
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Remember your password? <Link href="/login">Sign in</Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
