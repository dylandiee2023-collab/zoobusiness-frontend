import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { logo } from "@/assets/brand";
import aiSalesAgent from "@/assets/images/ai-sales-agent.webp";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";

import "./welcome-page.css";

function LandingPageContent() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { dimensions } = useLayout();

  const revealStyle = {
    animationDuration: theme.motion.modal,
    animationTimingFunction: theme.motion.easing,
    animationFillMode: "both" as const,
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const header = (
    <Flex
      className="landing-header"
      align="center"
      justify="space-between"
      gap={theme.spacing.inline}
      style={{ minHeight: theme.componentSizes.topbarHeight }}
    >
      <Link href="#home" aria-label="ZooBusiness home" className="landing-brand">
        <img className="landing-logo" src={logo} alt="ZooBusiness" />
      </Link>

      <nav className="landing-navigation" aria-label="Main navigation">
        <Link href="#home">Home</Link>
        <Link href="#solutions">Solutions</Link>
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#support">Help &amp; Support</Link>
        <Link href="#contact">Contact</Link>
      </nav>

      <Flex className="landing-account-actions" align="center" gap={theme.spacing.inline}>
        <Link href="/login">Log in</Link>
        <Button size="md" onClick={() => navigate("/signup")}>Sign up</Button>
      </Flex>
    </Flex>
  );

  return (
    <PublicShell header={header}>
      <main id="home" className="landing-page">
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
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
                  className="landing-eyebrow"
                  color={theme.colors.primary}
                  weight={theme.typography.body.fontWeight}
                  transform="uppercase"
                  letterSpacing={theme.typography.caption.letterSpacing}
                >
                  Built for the way business moves
                </Text>
                <Heading level={1} color={theme.colors.text} style={theme.typography.display}>
                  Run your business. <span className="landing-heading-accent">In one place.</span>
                </Heading>
                <Text color={theme.colors.textSecondary} size={theme.typography.body.fontSize}>
                  Manage products, stock, orders and payments in one connected workspace, with AI assistance for customer questions.
                </Text>
                <Flex className="landing-hero-actions" align="center" gap={theme.spacing.inline} wrap="wrap">
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    rightIcon={<AppIcon name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />}
                  >
                    Get started
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection("solutions")}>
                    Explore solutions
                  </Button>
                </Flex>
                <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                  One workspace for your everyday business operations.
                </Text>
              </Stack>

              <div className="landing-hero-visual landing-reveal" style={revealStyle}>
                <img
                  className="landing-hero-image"
                  src={aiSalesAgent}
                  alt="AI sales assistant helping customers discover products"
                />
                <div className="landing-workflow" aria-label="Business workflow: products, orders, payments and customer support">
                  <div className="landing-workflow-step">
                    <AppIcon name="package" size={theme.iconSizes.toolbar} aria-hidden="true" />
                    <span>Products</span>
                  </div>
                  <AppIcon className="landing-workflow-arrow" name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />
                  <div className="landing-workflow-step">
                    <AppIcon name="receipt" size={theme.iconSizes.toolbar} aria-hidden="true" />
                    <span>Orders</span>
                  </div>
                  <AppIcon className="landing-workflow-arrow" name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />
                  <div className="landing-workflow-step">
                    <AppIcon name="bot" size={theme.iconSizes.toolbar} aria-hidden="true" />
                    <span>AI support</span>
                  </div>
                </div>
              </div>
            </Flex>

            <section id="solutions" className="landing-section landing-solutions landing-reveal" style={revealStyle}>
              <div>
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>
                  Solutions
                </Text>
                <Heading level={2}>The daily work, connected.</Heading>
              </div>
              <Text color={theme.colors.textSecondary}>
                Keep product information, stock movements, order workflows and payment activity organised in the same workspace.
              </Text>
            </section>

            <section id="features" className="landing-section landing-reveal" style={revealStyle}>
              <div className="landing-section-heading">
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>
                  Features
                </Text>
                <Heading level={2}>Tools for everyday operations.</Heading>
              </div>
              <div className="landing-feature-grid">
                <article className="landing-feature-card">
                  <AppIcon name="package" size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                  <Heading level={3}>Product management</Heading>
                  <Text color={theme.colors.textSecondary}>Keep product details organised for your workspace.</Text>
                </article>
                <article className="landing-feature-card">
                  <AppIcon name="warehouse" size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                  <Heading level={3}>Inventory</Heading>
                  <Text color={theme.colors.textSecondary}>Track stock and inventory movements.</Text>
                </article>
                <article className="landing-feature-card">
                  <AppIcon name="receipt" size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                  <Heading level={3}>Orders &amp; payments</Heading>
                  <Text color={theme.colors.textSecondary}>Manage order workflows and payment activity.</Text>
                </article>
                <article className="landing-feature-card">
                  <AppIcon name="bot" size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                  <Heading level={3}>AI customer assistant</Heading>
                  <Text color={theme.colors.textSecondary}>Help answer questions using content available in your workspace.</Text>
                </article>
              </div>
            </section>

            <section id="pricing" className="landing-pricing landing-section landing-reveal" style={revealStyle}>
              <div>
                <Heading level={2}>Pricing that fits your business</Heading>
                <Text color={theme.colors.textSecondary}>Our pricing details will be announced soon.</Text>
              </div>
              <Button variant="outline" onClick={() => scrollToSection("contact")}>Talk to our team</Button>
            </section>

            <section id="support" className="landing-support landing-section landing-reveal" style={revealStyle}>
              <div>
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>
                  Help &amp; Support
                </Text>
                <Heading level={2}>We’re here to help.</Heading>
                <Text color={theme.colors.textSecondary}>For questions about ZooBusiness, reach the AvatraTech support team.</Text>
              </div>
              <div id="contact" className="landing-contact">
                <Text weight={theme.typography.body.fontWeight}>Contact support</Text>
                <Link href="mailto:support@avatratech.com" color={theme.colors.primary}>support@avatratech.com</Link>
              </div>
            </section>

            <footer className="landing-footer">
              <img className="landing-footer-logo" src={logo} alt="ZooBusiness" />
              <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                © {new Date().getFullYear()} AvatraTech. ZooBusiness is our business platform.
              </Text>
              <Link href="mailto:support@avatratech.com">Contact</Link>
            </footer>
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
