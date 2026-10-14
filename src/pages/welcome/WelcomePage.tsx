import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
} from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";

import "./welcome-page.css";

const capabilities = [
  {
    icon: "package",
    title: "Products",
    description: "Keep product information organized in your workspace.",
  },
  {
    icon: "warehouse",
    title: "Inventory",
    description: "Manage stock and follow inventory movements.",
  },
  {
    icon: "receipt",
    title: "Orders and payments",
    description: "Manage order workflows and record payment activity.",
  },
  {
    icon: "bot",
    title: "AI customer assistant",
    description:
      "Answer customer questions using content available to their workspace.",
  },
] as const;

function LandingPageContent() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { dimensions } = useLayout();

  const revealStyle = {
    animationDuration: theme.motion.modal,
    animationTimingFunction: theme.motion.easing,
    animationFillMode: "both" as const,
  };

  const header = (
    <Flex
      className="landing-header"
      align="center"
      justify="space-between"
      gap={theme.spacing.inline}
      style={{ minHeight: theme.componentSizes.topbarHeight }}
    >
      <Link
        href="#home"
        aria-label="AvatraTech home"
        color={theme.colors.text}
        weight={theme.typography.heading3.fontWeight}
        decoration="none"
      >
        AvatraTech
      </Link>

      <Flex
        className="landing-navigation"
        align="center"
        gap={theme.spacing.section}
      >
        <Link href="#home">Home</Link>
        <Link href="#solutions">Solutions</Link>
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#support">Help &amp; Support</Link>
        <Link href="#contact">Contact</Link>
      </Flex>

      <Flex align="center" gap={theme.spacing.inline}>
        <Link href="/login">Log in</Link>
        <Button size="md" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </Flex>
    </Flex>
  );

  return (
    <PublicShell header={header}>
      <main id="home">
        <Container
          maxWidth={dimensions.maxContentWidth}
          padding={theme.spacing.page}
          center
        >
          <Stack spacing={theme.spacing.section}>
            <Flex
              className="landing-hero"
              align="center"
              gap={theme.spacing.section}
              style={{ paddingBlock: theme.spacing.section }}
            >
              <Stack
                className="landing-hero-copy landing-reveal"
                spacing={theme.spacing.inline}
                style={{ ...revealStyle, flex: 1 }}
              >
                <Text
                  color={theme.colors.primary}
                  weight={theme.typography.body.fontWeight}
                  transform="uppercase"
                  letterSpacing={theme.typography.caption.letterSpacing}
                >
                  AvatraTech introduces AutoBots
                </Text>
                <Heading
                  level={1}
                  color={theme.colors.text}
                  style={theme.typography.display}
                >
                  Your business operations, connected.
                </Heading>
                <Text
                  color={theme.colors.textSecondary}
                  size={theme.typography.body.fontSize}
                >
                  AutoBots brings products, inventory, orders, payments and
                  customer conversations into one workspace—with AI assistance
                  to help answer customer questions.
                </Text>
                <Flex
                  className="landing-hero-actions"
                  align="center"
                  gap={theme.spacing.inline}
                  wrap="wrap"
                >
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    rightIcon={
                      <AppIcon
                        name="chevronRight"
                        size={theme.iconSizes.md}
                        aria-hidden="true"
                      />
                    }
                  >
                    Get started
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() =>
                      document
                        .getElementById("solutions")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore solutions
                  </Button>
                </Flex>
              </Stack>

              <Stack
                className="landing-hero-panel landing-reveal landing-reveal-delay"
                spacing={theme.spacing.inline}
                style={{
                  ...revealStyle,
                  flex: 1,
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.card,
                  padding: theme.spacing.section,
                }}
              >
                <Flex align="center" gap={theme.spacing.inline}>
                  <AppIcon
                    name="grid"
                    size={theme.iconSizes.lg}
                    color={theme.colors.primary}
                    aria-hidden="true"
                  />
                  <Heading level={3}>One connected workspace</Heading>
                </Flex>
                <Text color={theme.colors.textSecondary}>
                  The core tools your team uses, connected through AutoBots.
                </Text>
                <Grid
                  className="landing-capability-grid"
                  columns="repeat(2, minmax(0, 1fr))"
                  gap={theme.spacing.inline}
                >
                  {capabilities.map((capability) => (
                    <Flex
                      key={capability.title}
                      align="flex-start"
                      gap={theme.spacing.inline}
                      className="landing-capability"
                    >
                      <AppIcon
                        name={capability.icon}
                        size={theme.iconSizes.md}
                        color={theme.colors.primary}
                        aria-hidden="true"
                      />
                      <Text weight={theme.typography.body.fontWeight}>
                        {capability.title}
                      </Text>
                    </Flex>
                  ))}
                </Grid>
              </Stack>
            </Flex>

            <Stack
              id="solutions"
              spacing={theme.spacing.inline}
              className="landing-section landing-reveal"
              style={revealStyle}
            >
              <Text
                color={theme.colors.primary}
                weight={theme.typography.body.fontWeight}
                transform="uppercase"
                letterSpacing={theme.typography.caption.letterSpacing}
              >
                Solutions
              </Text>
              <Heading level={2}>From daily operations to customer support.</Heading>
              <Text color={theme.colors.textSecondary}>
                Use one workspace for product and stock management, order and
                payment workflows, customer conversations, and AI-assisted
                answers grounded in workspace content.
              </Text>
            </Stack>

            <Stack
              id="features"
              spacing={theme.spacing.inline}
              className="landing-section landing-reveal"
              style={revealStyle}
            >
              <Text
                color={theme.colors.primary}
                weight={theme.typography.body.fontWeight}
                transform="uppercase"
                letterSpacing={theme.typography.caption.letterSpacing}
              >
                Features
              </Text>
              <Heading level={2}>The essentials, in one place.</Heading>
              <Grid
                className="landing-feature-grid"
                columns="repeat(3, minmax(0, 1fr))"
                gap={theme.spacing.card}
              >
                {capabilities.map((capability) => (
                  <Stack
                    key={capability.title}
                    spacing={theme.spacing.inline}
                    className="landing-feature-card"
                    style={{
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: theme.radius.card,
                      padding: theme.spacing.card,
                    }}
                  >
                    <AppIcon
                      name={capability.icon}
                      size={theme.iconSizes.lg}
                      color={theme.colors.primary}
                      aria-hidden="true"
                    />
                    <Heading level={3}>{capability.title}</Heading>
                    <Text color={theme.colors.textSecondary}>
                      {capability.description}
                    </Text>
                  </Stack>
                ))}
              </Grid>
            </Stack>

            <Flex
              id="pricing"
              className="landing-pricing landing-section landing-reveal"
              align="center"
              justify="space-between"
              gap={theme.spacing.section}
              style={{
                ...revealStyle,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.card,
                padding: theme.spacing.section,
              }}
            >
              <Stack spacing={theme.spacing.inline}>
                <Heading level={2}>Pricing</Heading>
                <Text color={theme.colors.textSecondary}>
                  Pricing details will be shared soon.
                </Text>
              </Stack>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact us
              </Button>
            </Flex>

            <Flex
              id="support"
              className="landing-support landing-section landing-reveal"
              align="flex-start"
              gap={theme.spacing.section}
              style={revealStyle}
            >
              <Stack spacing={theme.spacing.inline} style={{ flex: 1 }}>
                <Heading level={2}>Help &amp; Support</Heading>
                <Text color={theme.colors.textSecondary}>
                  Need help with AutoBots? Contact the AvatraTech support team
                  by email.
                </Text>
              </Stack>
              <Stack
                id="contact"
                spacing={theme.spacing.inline}
                style={{ flex: 1 }}
              >
                <Text weight={theme.typography.body.fontWeight}>
                  Contact AvatraTech
                </Text>
                <Link
                  href="mailto:support@avatratech.com"
                  color={theme.colors.primary}
                >
                  support@avatratech.com
                </Link>
              </Stack>
            </Flex>

            <Flex
              className="landing-footer"
              align="center"
              justify="space-between"
              gap={theme.spacing.inline}
              wrap="wrap"
              style={{
                borderTop: `1px solid ${theme.colors.border}`,
                paddingBlock: theme.spacing.section,
              }}
            >
              <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                © {new Date().getFullYear()} AvatraTech
              </Text>
              <Flex align="center" gap={theme.spacing.section} wrap="wrap">
                <Link href="#terms">Terms &amp; Conditions</Link>
                <Link href="#privacy">Privacy</Link>
                <Link href="mailto:support@avatratech.com">Contact</Link>
              </Flex>
            </Flex>
          </Stack>
        </Container>
      </main>
    </PublicShell>
  );
}

export function WelcomePage() {
  return (
    <LayoutProvider layout="public">
      <LandingPageContent />
    </LayoutProvider>
  );
}
