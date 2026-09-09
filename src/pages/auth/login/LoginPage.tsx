import { useState, type FormEvent } from "react";

import { Button } from "@/design-system/buttons";
import { FormError, FormField, FormLabel } from "@/design-system/forms";
import { Input, PasswordInput } from "@/design-system/inputs";
import { Stack } from "@/design-system/layout";
import { Heading, Link, Text } from "@/design-system/typography";

import { usePlatform } from "@/platform/providers";
import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function LoginPage() {
  const { theme } = useTheme();
  const { authentication } = usePlatform();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [loginError, setLoginError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setEmailError(undefined);
    setPasswordError(undefined);
    setLoginError(undefined);

    let valid = true;
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    if (!valid) return;

    void submitLogin();
  }

  async function submitLogin() {
    setLoading(true);
    try {
      await authentication.login(email.trim(), password);
      // Authentication state now drives the route transition. The
      // AuthenticatedRoute and OnboardingGate decide whether the user belongs
      // on Business Setup or Dashboard.
    } catch (error) {
      if (
        error instanceof Error &&
        "status" in error &&
        error.status === 401
      ) {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError(
          error instanceof Error
            ? error.message
            : "Unable to sign in. Please try again.",
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
            Welcome back
          </Heading>
          <Text align="center">Sign in to your ZooBUSINESS account.</Text>
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={theme.spacing.form}>
            <FormField
              id="login-email"
              name="email"
              label="Email"
              {...(emailError !== undefined ? { error: emailError } : {})}
              disabled={loading}
            >
              <FormLabel />
              <Input
                id="login-email"
                type="email"
                value={email}
                placeholder="Enter your email"
                fullWidth
                disabled={loading}
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError(undefined);
                  setLoginError(undefined);
                }}
              />
              <FormError />
            </FormField>

            <FormField
              id="login-password"
              name="password"
              label="Password"
              {...(passwordError !== undefined
                ? { error: passwordError }
                : {})}
              disabled={loading}
            >
              <FormLabel />
              <PasswordInput
                id="login-password"
                value={password}
                placeholder="Enter your password"
                fullWidth
                disabled={loading}
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(undefined);
                  setLoginError(undefined);
                }}
              />
              <FormError />
            </FormField>

            {loginError !== undefined && (
              <small
                role="alert"
                style={{
                  display: "block",
                  color: theme.colors.danger,
                  fontSize: 12,
                  textAlign: "left",
                }}
              >
                {loginError}
              </small>
            )}

            <div style={{ width: "100%", textAlign: "right" }}>
              <Link href="/forgot-password">Forgot your password?</Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Don&apos;t have an account? <Link href="/register">Create an account</Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
