import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import aiSalesAgent from "@/assets/images/ai-sales-agent.webp";
import shopOwner from "@/assets/images/woman-left-shoppings-with-many-bags.webp";

function LandingPageContent() {
  const navigate = useNavigate();
  const { theme, mode, toggleMode } = useTheme();
  const { dimensions } = useLayout();
  const { language, setLanguage } = useLanguage();
  const sw = language === "sw";
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) =>
    resolvePublicCopy(language, key);
  const logo = mode === "light" ? lightLogo : darkLogo;

  const sectionStyle = {
    paddingBlock: "clamp(3.5rem, 8vw, 6.5rem)",
    scrollMarginTop: theme.componentSizes.topbarHeight,
  } as const;

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const header = (
    <Flex
      align="center"
      justify="space-between"
      gap={theme.spacing.inline}
      wrap="wrap"
      style={{ minHeight: theme.componentSizes.topbarHeight }}
    >
      <Link
        href="/"
        aria-label="ZooBusiness home"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        <img
          src={logo}
          alt="ZooBusiness"
          style={{
            display: "block",
            width: "auto",
            maxWidth: "10rem",
            maxHeight: "2.5rem",
            objectFit: "contain",
          }}
        />
      </Link>

      <Flex align="center" justify="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/" aria-current="page">{t("navHome")}</Link>
        <Link href="/features">{t("navFeatures")}</Link>
        <Link
          href="#solutions"
          onClick={(event) => {
            event.preventDefault();
            jumpTo("solutions");
          }}
        >
          {t("navSolutions")}
        </Link>
        <Link href="/pricing">{t("navPricing")}</Link>
        <Link href="/academy">Academy</Link>
      </Flex>

      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: theme.spacing.inline,
            color: theme.colors.textSecondary,
          }}
        >
          <select
            aria-label={t("language")}
            value={language}
            onChange={(event) => setLanguage(event.target.value as "en" | "sw")}
            style={{
              color: theme.colors.text,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.input,
              padding: theme.spacing.inline,
            }}
          >
            <option value="en">EN</option>
            <option value="sw">SW</option>
          </select>
        </label>
        <Button
          variant="ghost"
          size="sm"
          aria-label={mode === "dark" ? t("themeLight") : t("themeDark")}
          onClick={toggleMode}
        >
          <AppIcon
            name={mode === "dark" ? "check" : "settings"}
            size={theme.iconSizes.toolbar}
            aria-hidden="true"
          />
        </Button>
        <Link href="/login">{t("login")}</Link>
        <Button onClick={() => navigate("/signup")}>{t("getStarted")}</Button>
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
      <Flex align="center" gap={theme.spacing.inline}>
        <img
          src={logo}
          alt="ZooBusiness"
          style={{ width: "auto", maxWidth: "7rem", maxHeight: "1.8rem", objectFit: "contain" }}
        />
        <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>
          {sw ? "Biashara yako, sehemu moja." : "Your business, in one workspace."}
        </Text>
      </Flex>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/features">{t("navFeatures")}</Link>
        <Link href="mailto:support@avatratech.com">{t("navContact")}</Link>
        <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>
          © {new Date().getFullYear()} AvatraTech
        </Text>
      </Flex>
    </Flex>
  );

  return (
    <PublicShell header={header} footer={footer}>
      <main id="home">
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={0}>
            <section
              aria-labelledby="home-hero-title"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 19rem), 1fr))",
                alignItems: "center",
                gap: "clamp(2rem, 5vw, 4.5rem)",
                paddingBlock: "clamp(3rem, 7vw, 6rem)",
              }}
            >
              <Stack spacing={theme.spacing.section} style={{ alignItems: "flex-start", minWidth: 0 }}>
                <Text
                  color={theme.colors.primary}
                  weight={700}
                  transform="uppercase"
                  letterSpacing={theme.typography.caption.letterSpacing}
                >
                  ZOOBUSINESS · AVATRATECH
                </Text>
                <Heading
                  id="home-hero-title"
                  level={1}
                  style={{
                    fontSize: "clamp(2.8rem, 6.3vw, 5.8rem)",
                    fontWeight: 900,
                    lineHeight: 0.99,
                    letterSpacing: "-0.055em",
                    maxWidth: "11ch",
                    margin: 0,
                  }}
                >
                  {sw ? "Endesha biashara yako." : "Run your business."}
                  <span style={{ display: "block", color: theme.colors.primary }}>
                    {sw ? "Kila kitu sehemu moja." : "All in one place."}
                  </span>
                </Heading>
                <Text
                  color={theme.colors.textSecondary}
                  size={theme.typography.body.fontSize}
                  style={{ maxWidth: "37rem", lineHeight: 1.75 }}
                >
                  {sw
                    ? "Simamia bidhaa, stock, oda, malipo na wateja katika workspace moja. ZooBusiness hukusaidia kuweka shughuli zako za kila siku katika mtiririko unaoeleweka."
                    : "Manage products, inventory, orders, payments and customer records in one workspace. ZooBusiness helps bring everyday business operations into a clearer, more connected flow."}
                </Text>
                <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    rightIcon={<AppIcon name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />}
                  >
                    {t("getStarted")}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/features")}>
                    {sw ? "Tazama vipengele" : "Explore features"}
                  </Button>
                </Flex>
                <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>
                  {sw ? "Imeundwa na AvatraTech." : "Built by AvatraTech."}
                </Text>
              </Stack>

              <div style={{ minWidth: 0, position: "relative" }}>
                <img
                  src={aiSalesAgent}
                  alt={sw ? "Msaidizi wa mauzo wa AI katika ZooBusiness" : "AI sales assistant for business workflows"}
                  fetchPriority="high"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    maxHeight: "38rem",
                    objectFit: "contain",
                    borderRadius: theme.radius.card,
                  }}
                />
              </div>
            </section>

            <section id="solutions" aria-labelledby="solutions-title" style={sectionStyle}>
              <Stack spacing={theme.spacing.inline} style={{ maxWidth: "46rem", marginBottom: theme.spacing.section }}>
                <Text color={theme.colors.primary} weight={700} transform="uppercase">
                  {sw ? "SULUHISHO" : "SOLUTIONS"}
                </Text>
                <Heading id="solutions-title" level={2} style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                  {sw ? "Kazi za biashara zikiwa zimeunganishwa." : "A more connected way to work."}
                </Heading>
                <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75, maxWidth: "42rem" }}>
                  {sw
                    ? "Kuanzia kusaidia mazungumzo ya wateja hadi kufuatilia shughuli za duka, weka taarifa muhimu pamoja na upunguze kazi zinazotawanyika."
                    : "From assisting customer conversations to keeping shop activity organised, bring important information together and reduce scattered manual work."}
                </Text>
              </Stack>

              <Flex
                align="center"
                gap={theme.spacing.section}
                wrap="wrap"
                style={{
                  padding: "clamp(1.25rem, 4vw, 2.5rem)",
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.card,
                  background: theme.colors.surface,
                  marginBottom: theme.spacing.section,
                }}
              >
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 18rem", minWidth: 0 }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">AI · {sw ? "MSAIDIZI WA MAUZO" : "SALES ASSISTANCE"}</Text>
                  <Heading level={3}>{sw ? "Saidia timu yako kujibu wateja." : "Give your team a hand with customer conversations."}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75 }}>
                    {sw
                      ? "Tumia uwezo wa AI na mazungumzo yaliyowezeshwa kwenye workspace yako. Vitendo vinavyopatikana hutegemea integrations na usanidi uliokamilika."
                      : "Use AI-assisted conversations where enabled in your workspace. Available actions depend on the integrations and configuration in place."}
                  </Text>
                </Stack>
                <img
                  src={aiSalesAgent}
                  alt={sw ? "Suluhisho la msaidizi wa mauzo wa AI" : "AI sales assistance"}
                  loading="lazy"
                  style={{ display: "block", flex: "1 1 18rem", width: "100%", maxWidth: "30rem", minWidth: 0, height: "auto", objectFit: "contain", borderRadius: theme.radius.card }}
                />
              </Flex>

              <Flex
                align="center"
                gap={theme.spacing.section}
                wrap="wrap"
                style={{
                  padding: "clamp(1.25rem, 4vw, 2.5rem)",
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.card,
                  background: theme.colors.surface,
                }}
              >
                <img
                  src={shopOwner}
                  alt={sw ? "Mteja akiwa na mifuko ya manunuzi" : "Shopper carrying shopping bags"}
                  loading="lazy"
                  style={{ display: "block", flex: "1 1 18rem", width: "100%", maxWidth: "30rem", minWidth: 0, height: "auto", objectFit: "cover", borderRadius: theme.radius.card }}
                />
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 18rem", minWidth: 0 }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">
                    {sw ? "HUDUMA KWA WATEJA" : "CUSTOMER EXPERIENCE"}
                  </Text>
                  <Heading level={3}>{sw ? "Safari rahisi ya mteja." : "A smoother customer journey."}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75 }}>
                    {sw
                      ? "Panga katalogi ya bidhaa, fuatilia oda na weka rekodi za malipo pamoja. Channel kama WhatsApp hutumika pale inapounganishwa na kusanidiwa."
                      : "Keep product information clear and order and payment records organised. Channels such as WhatsApp are available where connected and configured."}
                  </Text>
                </Stack>
              </Flex>
            </section>

            <section id="pricing-preview" aria-labelledby="pricing-title" style={sectionStyle}>
              <Flex
                align="center"
                justify="space-between"
                gap={theme.spacing.section}
                wrap="wrap"
                style={{
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  borderRadius: theme.radius.card,
                  background: theme.colors.surfaceSecondary,
                }}
              >
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 20rem" }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">
                    {sw ? "BEI NA MIPANGO" : "PRICING"}
                  </Text>
                  <Heading id="pricing-title" level={2}>
                    {sw ? "Chagua mpango unaofaa biashara yako." : "Find the right plan for your business."}
                  </Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>
                    {sw
                      ? "Taarifa za mipango na bei zinapatikana kwenye ukurasa wa bei."
                      : "Visit the pricing page for plan information and the latest pricing details."}
                  </Text>
                </Stack>
                <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                  {sw ? "Angalia mipango" : "View pricing"}
                </Button>
              </Flex>
            </section>

            <section id="contact" aria-labelledby="contact-title" style={sectionStyle}>
              <Flex
                align="center"
                justify="space-between"
                gap={theme.spacing.section}
                wrap="wrap"
                style={{
                  padding: "clamp(1.5rem, 4vw, 3rem)",
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.card,
                }}
              >
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 20rem" }}>
                  <Heading id="contact-title" level={2}>
                    {sw ? "Tuanze pamoja." : "Ready to get started?"}
                  </Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>
                    {sw
                      ? "Fungua akaunti au wasiliana na timu ya AvatraTech kwa msaada."
                      : "Create an account or contact the AvatraTech team for help getting started."}
                  </Text>
                  <Link href="mailto:support@avatratech.com" color={theme.colors.primary}>
                    support@avatratech.com
                  </Link>
                </Stack>
                <Flex gap={theme.spacing.inline} wrap="wrap">
                  <Button size="lg" onClick={() => navigate("/signup")}>{t("getStarted")}</Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/features")}>
                    {sw ? "Vipengele vyote" : "All features"}
                  </Button>
                </Flex>
              </Flex>
            </section>
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
