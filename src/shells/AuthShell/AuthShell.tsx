import { Container, Stack, Center, Flex } from "@/design-system/layout";
import { Link } from "@/design-system/typography";
import { useTheme } from "@/theme/hooks";

import { AuthBrand } from "./components/AuthBrand";
import { AuthCard } from "./components/AuthCard";
import { authShellRecipe } from "./recipes";

import type { AuthShellProps } from "./AuthShell.types";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Guide", href: "/guide" },
  { label: "Help", href: "/help" },
  { label: "Contact", href: "/contact" },
  { label: "Language", href: "/language" },
] as const;

export function AuthShell({
  children,
  glass = true,
}: AuthShellProps) {
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
          style={{
            width: "100%",
          }}
        >
          <AuthBrand />

          <Center style={{ width: "100%" }}>
            <AuthCard>{children}</AuthCard>
          </Center>
        </Stack>
      </Container>

      <nav
        aria-label="Authentication footer"
        style={{
          width: "100%",
        }}
      >
        <Flex
          gap={theme.spacing.inline}
          wrap="wrap"
          justify="center"
          align="center"
        >
          {FOOTER_LINKS.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </Flex>
      </nav>
    </main>
  );
}
