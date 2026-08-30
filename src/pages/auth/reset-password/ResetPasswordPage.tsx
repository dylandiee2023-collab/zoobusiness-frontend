import { useState, type FormEvent } from "react";

import { Button } from "@/design-system/buttons";
import { PasswordInput } from "@/design-system/inputs";
import { FormField, FormLabel } from "@/design-system/forms";
import { Stack } from "@/design-system/layout";
import {
  Heading,
  Link,
  Text,
} from "@/design-system/typography";

import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function ResetPasswordPage() {
  const { theme } = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
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
            Reset your password
          </Heading>

          <Text align="center">
            Create a new password for your
            ZooBUSINESS account.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={theme.spacing.form}
          >
            <FormField
              id="reset-password"
              name="password"
              label="New password"
            >
              <FormLabel />

              <PasswordInput
                id="reset-password"
                value={password}
                placeholder="Enter your new password"
                required
                fullWidth
                autoComplete="new-password"
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
              />
            </FormField>

            <FormField
              id="reset-password-confirm"
              name="confirmPassword"
              label="Confirm password"
            >
              <FormLabel />

              <PasswordInput
                id="reset-password-confirm"
                value={confirmPassword}
                placeholder="Confirm your new password"
                required
                fullWidth
                autoComplete="new-password"
                onChange={(event) =>
                  setConfirmPassword(
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
              disabled={
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
            >
              Reset password
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
