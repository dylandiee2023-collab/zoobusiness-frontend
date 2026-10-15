import { Container, Flex, Link, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import { PricingSection } from "@/pages/pricing/PricingSection";

function PricingContent() {
  const { theme } = useTheme();
  const { dimensions } = useLayout();
  const { language } = useLanguage();
  const sw = language === "sw";
  const logo = theme.mode === "dark" ? lightLogo : darkLogo;

  const header = (
    <Flex
      align="center"
      justify="space-between"
      gap={theme.spacing.inline}
      wrap="wrap"
      style={{ minHeight: theme.componentSizes.topbarHeight }}
    >
      <Link href="/" aria-label="ZooBusiness home">
        <img
          src={logo}
          alt="ZooBusiness"
          style={{ display: "block", maxWidth: "10rem", maxHeight: "2.5rem", width: "auto" }}
        />
      </Link>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/">{sw ? "Nyumbani" : "Home"}</Link>
        <Link href="/features">{sw ? "Vipengele" : "Features"}</Link>
        <Link href="/pricing" aria-current="page">{sw ? "Bei" : "Pricing"}</Link>
        <Link href="/academy">Academy</Link>
      </Flex>
    </Flex>
  );

  const footer = (
    <Flex
      align="center"
      justify="space-between"
      gap={theme.spacing.inline}
      wrap="wrap"
      style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}
    >
      <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
        © {new Date().getFullYear()} AvatraTech
      </Text>
      <Link href="mailto:support@avatratech.com">support@avatratech.com</Link>
    </Flex>
  );

  return (
    <PublicShell header={header} footer={footer}>
      <main>
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <div style={{ paddingBlock: theme.spacing.section }}>
            <PricingSection />
          </div>
        </Container>
      </main>
    </PublicShell>
  );
}

export function PricingPage() {
  return (
    <LayoutProvider layout="public">
      <PricingContent />
    </LayoutProvider>
  );
}
