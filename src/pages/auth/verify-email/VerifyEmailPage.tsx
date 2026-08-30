import { useState } from "react";

import { Button } from "@/design-system/buttons";
import { OtpInput } from "@/design-system/components/otp-input";
import { Stack } from "@/design-system/layout";
import {
  Heading,
  Link,
  Text,
} from "@/design-system/typography";

import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function VerifyEmailPage() {
  const { theme } = useTheme();

  const [code, setCode] = useState("");

  return (
    <AuthShell>
      <Stack
        spacing={theme.spacing.section}
      >
        <Stack
          spacing={theme.spacing.stack}
          align="center"
        >
          <Heading
            level={1}
            align="center"
          >
            Verify your email
          </Heading>

          <Text align="center">
            Enter the 6-digit verification
            code sent to your email.
          </Text>
        </Stack>

        <Stack
          spacing={theme.spacing.form}
          align="center"
        >
          <OtpInput
            length={6}
            value={code}
            autoFocus
            onValueChange={setCode}
          />

          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            disabled={code.length !== 6}
          >
            Verify email
          </Button>
        </Stack>

        <Stack
          spacing={theme.spacing.stack}
          align="center"
        >
          <Text align="center">
            Didn&apos;t receive the code?
          </Text>

          <Link href="/verify-email">
            Resend code
          </Link>

          <Link href="/login">
            Back to sign in
          </Link>
        </Stack>
      </Stack>
    </AuthShell>
  );
}
