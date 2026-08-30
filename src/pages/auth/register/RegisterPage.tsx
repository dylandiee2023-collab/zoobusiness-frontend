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

export function RegisterPage() {
  const { theme } = useTheme();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

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
            Create your account
          </Heading>

          <Text align="center">
            Get started with ZooBUSINESS.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack
            spacing={theme.spacing.form}
          >
            <FormField
              id="register-full-name"
              name="fullName"
              label="Full name"
            >
              <FormLabel />

              <Input
                id="register-full-name"
                type="text"
                value={fullName}
                placeholder="Enter your full name"
                required
                fullWidth
                autoComplete="name"
                onChange={(event) =>
                  setFullName(
                    event.target.value,
                  )
                }
              />
            </FormField>

            <FormField
              id="register-email"
              name="email"
              label="Email"
            >
              <FormLabel />

              <Input
                id="register-email"
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
              id="register-password"
              name="password"
              label="Password"
            >
              <FormLabel />

              <PasswordInput
                id="register-password"
                value={password}
                placeholder="Create a password"
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
            >
              Create account
            </Button>
          </Stack>
        </form>

        <Text align="center">
          Already have an account?{" "}
          <Link href="/login">
            Sign in
          </Link>
        </Text>
      </Stack>
    </AuthShell>
  );
}
