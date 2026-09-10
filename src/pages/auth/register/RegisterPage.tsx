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

export function RegisterPage() {
  const { theme } = useTheme();
  const { authentication } = usePlatform();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fullNameError, setFullNameError] = useState<string | undefined>();

  const [emailError, setEmailError] = useState<string | undefined>();

  const [passwordError, setPasswordError] = useState<string | undefined>();

  const [registerError, setRegisterError] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setFullNameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setRegisterError(undefined);

    let valid = true;

    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      await authentication.register(fullName.trim(), email.trim(), password);

      sessionStorage.setItem("verification_email", email.trim());

      navigate("/verify-email", {
        replace: true,
      });
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 409) {
        setRegisterError("An account with this email already exists.");
      } else {
        setRegisterError(
          error instanceof Error
            ? error.message
            : "Unable to create your account. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <Stack spacing={theme.spacing.section}>
        <Stack spacing={theme.spacing.stack} align="center">
          <Heading level={1} align="center">
            Create your account
          </Heading>

          <Text align="center">Get started with ZooBUSINESS.</Text>
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={theme.spacing.form}>
            <FormField
              id="register-full-name"
              name="fullName"
              label="Full name"
              {...(fullNameError !== undefined ? { error: fullNameError } : {})}
            >
              <FormLabel />

              <Input
                id="register-full-name"
                type="text"
                value={fullName}
                placeholder="Enter your full name"
                fullWidth
                autoComplete="name"
                disabled={loading}
                onChange={(event) => {
                  setFullName(event.target.value);
                  setFullNameError(undefined);
                  setRegisterError(undefined);
                }}
              />

              <FormError />
            </FormField>

            <FormField
              id="register-email"
              name="email"
              label="Email"
              {...(emailError !== undefined ? { error: emailError } : {})}
            >
              <FormLabel />

              <Input
                id="register-email"
                type="email"
                value={email}
                placeholder="Enter your email"
                fullWidth
                autoComplete="email"
                disabled={loading}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError(undefined);
                  setRegisterError(undefined);
                }}
              />

              <FormError />
            </FormField>

            <FormField
              id="register-password"
              name="password"
              label="Password"
              {...(passwordError !== undefined ? { error: passwordError } : {})}
            >
              <FormLabel />

              <PasswordInput
                id="register-password"
                value={password}
                placeholder="Create a password"
                fullWidth
                autoComplete="new-password"
                disabled={loading}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(undefined);
                  setRegisterError(undefined);
                }}
              />

              <FormError />
            </FormField>

            {registerError !== undefined && (
              <small
                role="alert"
                style={{
                  display: "block",
                  color: "#DC2626",
                  fontSize: 12,
                  textAlign: "left",
                }}
              >
                {registerError}
              </small>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Already have an account? <Link href="/login">Sign in</Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
