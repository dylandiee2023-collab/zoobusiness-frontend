import { Container, Stack, Center } from "@/design-system/layout";
import { useTheme } from "@/theme/hooks";

import { AuthBrand } from "./components/AuthBrand";
import { AuthCard } from "./components/AuthCard";
import { authShellRecipe } from "./recipes";

import type { AuthShellProps } from "./AuthShell.types";

export function AuthShell({ children, glass = false, footer }: AuthShellProps) {
  const { theme } = useTheme();
  const recipe = authShellRecipe(theme, { glass });

  return (
    <main style={recipe.style}>
      <Container
        maxWidth={theme.containers.dialog}
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={theme.spacing.section}
          align="center"
          style={{ width: "100%" }}
        >
          <AuthBrand />
          <Center style={{ width: "100%" }}>
            <AuthCard>{children}</AuthCard>
          </Center>
        </Stack>
      </Container>

      {footer ? (
        <nav aria-label="Authentication footer" style={{ width: "100%" }}>
          {footer}
        </nav>
      ) : null}
    </main>
  );
}
