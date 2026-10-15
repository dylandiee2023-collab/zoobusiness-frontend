import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import heroWoman from "@/assets/images/hero-woman.webp";
import aiSalesAgent from "@/assets/images/ai-sales-agent.webp";
import instagramIcon from "@/assets/icons/social/instagram.svg";
import linkedinIcon from "@/assets/icons/social/linkedin.svg";
import xIcon from "@/assets/icons/social/x.svg";
import facebookIcon from "@/assets/icons/social/facebook.svg";
import youtubeIcon from "@/assets/icons/social/youtube.svg";

function LandingPageContent() {
  const navigate = useNavigate();
  const { theme, mode, toggleMode } = useTheme();
  const { dimensions } = useLayout();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const sectionStyle = {
    paddingBlock: theme.spacing.section,
    scrollMarginTop: theme.componentSizes.topbarHeight,
  } as const;
  const cardStyle = {
    flex: "1 1 15rem",
    minWidth: 0,
    padding: theme.spacing.card,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.card,
    background: theme.colors.surface,
    boxShadow: theme.shadows.card,
  } as const;
  const mutedText = { color: theme.colors.textSecondary } as const;

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap"
      style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <Link href="#home" aria-label="ZooBusiness home" style={{ display: "inline-flex", alignItems: "center" }}>
        <img src={logo} alt="ZooBusiness" style={{ display: "block", width: "auto", maxWidth: "10rem", maxHeight: "2.5rem", objectFit: "contain" }} />
      </Link>
      <Flex align="center" justify="center" gap={theme.spacing.inline} wrap="wrap">
        {([["home", "navHome"]] as const).map(([id, key]) => (
          <Link key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); jumpTo(id); }} style={{ whiteSpace: "nowrap" }}>{t(key)}</Link>
        ))}
        <Link href="/features" style={{ whiteSpace: "nowrap" }}>{t("navFeatures")}</Link>
        <Link href="#solutions" onClick={(event) => { event.preventDefault(); jumpTo("solutions"); }} style={{ whiteSpace: "nowrap" }}>{t("navSolutions")}</Link>
        <Link href="/pricing" style={{ whiteSpace: "nowrap" }}>{t("navPricing")}</Link>
        <Link href="/academy" style={{ whiteSpace: "nowrap" }}>Academy</Link>
      </Flex>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <label style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.inline, color: theme.colors.textSecondary }}>
          <AppIcon name="help" size={theme.iconSizes.toolbar} aria-hidden="true" />
          <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")}
            style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
            <option value="en">EN</option><option value="sw">SW</option>
          </select>
        </label>
        <Button variant="ghost" size="sm" aria-label={mode === "dark" ? t("themeLight") : t("themeDark")} onClick={toggleMode}>
          <AppIcon name={mode === "dark" ? "check" : "settings"} size={theme.iconSizes.toolbar} aria-hidden="true" />
        </Button>
        <Link href="/login">{t("login")}</Link>
        <Button size="md" onClick={() => navigate("/signup")}>{t("signup")}</Button>
      </Flex>
    </Flex>
  );

  const footer = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}>
      <Flex align="center" gap={theme.spacing.inline}>
        <img src={logo} alt="ZooBusiness" style={{ width: "auto", maxWidth: "7rem", maxHeight: "1.8rem", objectFit: "contain" }} />
        <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>{t("footerTagline")}</Text>
      </Flex>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="mailto:support@avatratech.com">{t("navContact")}</Link>
        <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>© {new Date().getFullYear()} {t("copyright")}</Text>
      </Flex>
    </Flex>
  );

  return (
    <PublicShell header={header} footer={footer}>
      <main id="home">
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={theme.spacing.section}>
            <section
              aria-labelledby="home-hero-title"
              style={{
                position: "relative",
                isolation: "isolate",
                display: "flex",
                alignItems: "center",
                minHeight: "min(48rem, calc(100vh - 6.5rem))",
                padding: "clamp(2rem, 5vw, 4.5rem)",
                overflow: "hidden",
                borderRadius: theme.radius.card,
                backgroundImage: `url(${heroWoman})`,
                backgroundSize: "cover",
                backgroundPosition: "center 38%",
                color: "#FFFFFF",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  background: "linear-gradient(90deg, rgba(7, 15, 12, 0.88) 0%, rgba(7, 15, 12, 0.68) 42%, rgba(7, 15, 12, 0.12) 100%)",
                }}
              />
              <Stack spacing={theme.spacing.section} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "48rem", alignItems: "flex-start" }}>
                <Text color="#FFFFFF" weight={700} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>
                  Z O O B U S I N E S S
                </Text>
                <Heading
                  id="home-hero-title"
                  level={1}
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(3.25rem, 6.3vw, 6.5rem)",
                    fontWeight: 900,
                    lineHeight: 0.98,
                    letterSpacing: "-0.055em",
                    maxWidth: "10ch",
                    margin: 0,
                  }}
                >
                  <span style={{ display: "block" }}>Run your business</span>
                  <span style={{ display: "block", color: theme.colors.primary }}>with automation.</span>
                </Heading>
                <Text color="#FFFFFF" size={theme.typography.body.fontSize} style={{ maxWidth: "38rem", lineHeight: 1.65 }}>
                  Manage products, inventory, orders and payments in one workspace. Automate everyday workflows and give your customers a better buying experience.
                </Text>
                <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
                  <Button size="lg" onClick={() => navigate("/signup")} rightIcon={<AppIcon name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />}>
                    {t("getStarted")}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/features")} style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.72)" }}>
                    Explore features
                  </Button>
                </Flex>
              </Stack>
            </section>

            <Flex id="solutions" align="start" gap={theme.spacing.section} wrap="wrap" style={sectionStyle}>
              <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 18rem" }}>
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>{t("solutionsEyebrow")}</Text>
                <Heading level={2}>{t("solutionsTitle")}</Heading>
              </Stack>
              <Text color={theme.colors.textSecondary} style={{ flex: "1 1 18rem" }}>{t("solutionsBody")}</Text>
            </Flex>

            <Stack id="features" spacing={theme.spacing.section} style={sectionStyle}>
              <Stack spacing={theme.spacing.inline}>
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>{t("featuresEyebrow")}</Text>
                <Heading level={2}>{t("featuresTitle")}</Heading>
              </Stack>
              <Flex gap={theme.spacing.inline} wrap="wrap">
                {([
                  ["package", "productTitle", "productBody"],
                  ["warehouse", "inventoryTitle", "inventoryBody"],
                  ["receipt", "ordersTitle", "ordersBody"],
                  ["bot", "aiTitle", "aiBody"],
                ] as const).map(([icon, title, body]) => (
                  <Stack key={title} spacing={theme.spacing.inline} style={cardStyle}>
                    <AppIcon name={icon} size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                    <Heading level={3}>{t(title)}</Heading>
                    <Text color={theme.colors.textSecondary}>{t(body)}</Text>
                  </Stack>
                ))}
              </Flex>
            </Stack>

            <Flex align="center" gap={theme.spacing.section} wrap="wrap" style={sectionStyle}>
              <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 16rem" }}>
                <Heading level={2}>{t("channelsTitle")}</Heading>
                <Text color={theme.colors.textSecondary}>{t("channelsBody")}</Text>
                <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>WhatsApp is the currently registered provider; other channels require verified provider setup.</Text>
              </Stack>
              <Flex gap={theme.spacing.inline} wrap="wrap" style={{ flex: "1 1 18rem" }}>
                {([
                  [linkedinIcon, "LinkedIn"],
                  [xIcon, "X"],
                  [facebookIcon, "Facebook"],
                  [youtubeIcon, "YouTube"],
                  [instagramIcon, "Instagram"],
                ] as const).map(([iconSrc, label]) => (
                  <Flex key={label} align="center" gap={theme.spacing.inline} style={{ ...cardStyle, flex: "1 1 9rem", padding: theme.spacing.card }}>
                    <img src={iconSrc} alt="" aria-hidden="true" width={theme.iconSizes.toolbar} height={theme.iconSizes.toolbar} style={{ display: "block", flexShrink: 0 }} />
                    <Text>{label}</Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>

            <Stack id="pricing" spacing={theme.spacing.section} style={sectionStyle}>
              <Stack spacing={theme.spacing.inline} style={{ textAlign: "center" }}>
                <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>{t("pricingEyebrow")}</Text>
                <Heading level={2}>{t("pricingTitle")}</Heading>
                <Text color={theme.colors.textSecondary}>{t("pricingBody")}</Text>
              </Stack>
              <Flex gap={theme.spacing.inline} wrap="wrap">
                {(["freePlan", "proPlan", "teamPlan", "enterprisePlan"] as const).map((key) => (
                  <Stack key={key} spacing={theme.spacing.inline} style={cardStyle}>
                    <Heading level={3}>{t(key)}</Heading>
                    <Text color={theme.colors.textSecondary}>{t("planComing")}</Text>
                    <Button variant="outline" onClick={() => jumpTo("contact")}>{t("planContact")}</Button>
                  </Stack>
                ))}
              </Flex>
            </Stack>

            <Flex id="support" align="center" gap={theme.spacing.section} wrap="wrap" style={{ ...sectionStyle, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section }}>
              <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 18rem" }}>
                <Heading level={2}>{t("supportTitle")}</Heading>
                <Text color={theme.colors.textSecondary}>{t("supportBody")}</Text>
              </Stack>
              <Stack id="contact" spacing={theme.spacing.inline} style={{ flex: "1 1 14rem" }}>
                <Text weight={theme.typography.body.fontWeight}>{t("contactSupport")}</Text>
                <Link href="mailto:support@avatratech.com" color={theme.colors.primary}>support@avatratech.com</Link>
              </Stack>
            </Flex>
            <Flex justify="center" style={{ paddingBlock: theme.spacing.section }}>
              <img src={aiSalesAgent} alt="AI sales assistant" loading="lazy" style={{ display: "block", width: "100%", maxWidth: "24rem", height: "auto", objectFit: "contain", borderRadius: theme.radius.card }} />
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
