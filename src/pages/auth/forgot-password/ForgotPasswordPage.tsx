import { useState, type FormEvent } from "react";

import { Button } from "@/design-system/buttons";
import {
  FormField,
  FormLabel,
} from "@/design-system/forms";
import { Input } from "@/design-system/inputs";
import { Stack } from "@/design-system/layout";
import {
  Heading,
  Link,
  Text,
} from "@/design-system/typography";

import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function ForgotPasswordPage() {
  const { theme } = useTheme();

  const [email, setEmail] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
  }

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
            Forgot your password?
          </Heading>

          <Text align="center">
            Enter the email associated with
            your ZooBUSINESS account.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={theme.spacing.form}
          >
            <FormField
              id="forgot-password-email"
              name="email"
              label="Email"
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
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              Send reset link
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Remember your password?{" "}
          <Link href="/login">
            Sign in
          </Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
