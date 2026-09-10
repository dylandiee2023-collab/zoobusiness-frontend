import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/design-system/buttons";
import { FormError, FormField } from "@/design-system/forms";
import { OtpInput } from "@/design-system/components/otp-input";
import { Stack } from "@/design-system/layout";
import { Heading, Link, Text } from "@/design-system/typography";

import { usePlatform } from "@/platform/providers";
import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function VerifyEmailPage() {
  const { theme } = useTheme();
  const { authentication } = usePlatform();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const email = sessionStorage.getItem("verification_email") ?? "";

  const [error, setError] = useState<string | undefined>();

  const [success, setSuccess] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setCooldown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldown]);

  function handleCodeChange(value: string) {
    setCode(value);
    setError(undefined);
    setSuccess(undefined);
  }

  async function handleVerify() {
    if (loading || code.length !== 6) {
      return;
    }

    if (!email) {
      setError("Verification email is missing. Please register again.");
      return;
    }

    setError(undefined);
    setSuccess(undefined);
    setLoading(true);

    try {
      await authentication.verifyEmail(email, code);

      setSuccess("Email verified successfully.");

      sessionStorage.removeItem("verification_email");

      window.setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1000);
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        if (error.status === 401) {
          setError("Invalid verification code.");
        } else if (error.status === 400) {
          setError(error.message || "Verification code is invalid or expired.");
        } else {
          setError("Unable to verify your email. Please try again.");
        }
      } else {
        setError("Unable to verify your email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resending || cooldown > 0 || !email) {
      return;
    }

    setError(undefined);
    setSuccess(undefined);
    setResending(true);

    try {
      await authentication.resendVerification(email);

      setSuccess("A new verification code has been sent.");

      setCooldown(60);
      setCode("");
    } catch (error) {
      if (error instanceof Error && "status" in error && error.status === 400) {
        setError(error.message);
      } else {
        setError("Unable to resend the verification code. Please try again.");
      }
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthShell>
      <Stack spacing={theme.spacing.section}>
        <Stack spacing={theme.spacing.stack} align="center">
          <Heading level={1} align="center">
            Verify your email
          </Heading>

          <Text align="center">
            Enter the 6-digit verification code sent to your email.
          </Text>

          {email && <Text align="center">{email}</Text>}
        </Stack>

        <Stack spacing={theme.spacing.form} align="center">
          <FormField
            id="verify-email-code"
            name="verificationCode"
            {...(error !== undefined ? { error } : {})}
          >
            <OtpInput
              length={6}
              value={code}
              autoFocus
              disabled={loading}
              onValueChange={handleCodeChange}
            />

            <FormError />
          </FormField>

          {success !== undefined && (
            <small
              role="status"
              style={{
                display: "block",
                width: "100%",
                color: theme.colors.success,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {success}
            </small>
          )}

          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            disabled={loading || resending || code.length !== 6}
            loading={loading}
            onClick={() => {
              void handleVerify();
            }}
          >
            {loading ? "Verifying..." : "Verify email"}
          </Button>
        </Stack>

        <Stack spacing={theme.spacing.stack} align="center">
          <Text align="center">Didn&apos;t receive the code?</Text>

          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={resending || cooldown > 0 || !email}
            loading={resending}
            onClick={() => {
              void handleResend();
            }}
          >
            {resending
              ? "Sending..."
              : cooldown > 0
                ? `Resend code in ${cooldown}s`
                : "Resend code"}
          </Button>

          <Link href="/login">Back to sign in</Link>
        </Stack>
      </Stack>
    </AuthShell>
  );
}
