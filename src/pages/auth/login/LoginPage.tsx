import { useState, type FormEvent } from "react";

import { Button } from "@/design-system/buttons";
import {
  FormField,
  FormLabel,
} from "@/design-system/forms";
import {
  Input,
  PasswordInput,
} from "@/design-system/inputs";
import { Stack } from "@/design-system/layout";
import {
  Heading,
  Link,
  Text,
} from "@/design-system/typography";

import { useTheme } from "@/theme/hooks";
import { AuthShell } from "@/shells/AuthShell";

export function LoginPage() {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
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
            Welcome back
          </Heading>

          <Text align="center">
            Sign in to your ZooBUSINESS
            account.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={theme.spacing.form}
          >
            <FormField
              id="login-email"
              name="email"
              label="Email"
            >
              <FormLabel />

              <Input
                id="login-email"
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

            <FormField
              id="login-password"
              name="password"
              label="Password"
            >
              <FormLabel />

              <PasswordInput
                id="login-password"
                value={password}
                placeholder="Enter your password"
                required
                fullWidth
                autoComplete="current-password"
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
              />
            </FormField>

            <div
              style={{
                width: "100%",
                textAlign: "right",
              }}
            >
              <Link href="/forgot-password">
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              Sign in
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            Create an account
          </Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
