import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/design-system/buttons";
import { FormError, FormField, FormLabel } from "@/design-system/forms";
import { Input } from "@/design-system/inputs";
import { Stack } from "@/design-system/layout";
import { Heading, Link, Text } from "@/design-system/typography";

import { usePlatform } from "@/platform/providers";
import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function ForgotPasswordPage() {
  const { theme } = useTheme();
  const { authentication } = usePlatform();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError(undefined);
    setSuccess(undefined);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const message = await authentication.forgotPassword(normalizedEmail);

      sessionStorage.setItem("reset_password_email", normalizedEmail);
      setSuccess(message);
      navigate("/reset-password", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to start password reset. Please try again.",
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
            Forgot your password?
          </Heading>

          <Text align="center">
            Enter the email associated with your ZooBUSINESS account.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={theme.spacing.form}>
            <FormField
              id="forgot-password-email"
              name="email"
              label="Email"
              {...(error !== undefined ? { error } : {})}
            >
              <FormLabel />
              <Input
                id="forgot-password-email"
                type="email"
                value={email}
                placeholder="Enter your email"
                required
                fullWidth
                autoComplete="email"
                disabled={loading}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(undefined);
                }}
              />
              <FormError />
            </FormField>

            {success !== undefined ? (
              <Text align="center">{success}</Text>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset code"}
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
