import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { PublicShell } from "@/shells/PublicShell";
import { PricingSection } from "@/pages/pricing/PricingSection";
import { Footer } from "./components/Footer";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import aiSalesAgent from "@/assets/images/ai-sales-agent.webp";
import heroWoman from "@/assets/images/hero-woman.webp";
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
            name="moon"
            size={theme.iconSizes.toolbar}
            aria-hidden="true"
          />
        </Button>
        <Link href="/login">{t("login")}</Link>
        <Button onClick={() => navigate("/signup")}>{t("getStarted")}</Button>
      </Flex>
    </Flex>
  );

  return (
    <PublicShell header={header} footer={<Footer />}>
      <main id="home">
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={0}>
            <section
              aria-labelledby="home-hero-title"
              style={{
                position: "relative",
                isolation: "isolate",
                display: "flex",
                alignItems: "center",
                minHeight: "clamp(30rem, 72svh, 40rem)",
                padding: "clamp(1.5rem, 4vw, 3.25rem)",
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
                  background: "linear-gradient(90deg, rgba(7, 15, 12, 0.9) 0%, rgba(7, 15, 12, 0.72) 48%, rgba(7, 15, 12, 0.16) 100%)",
                }}
              />
              <Stack spacing={theme.spacing.section} style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "48rem", alignItems: "flex-start" }}>
                <Text color="#FFFFFF" weight={700} transform="uppercase" letterSpacing={theme.typography.caption.letterSpacing}>
                  Z O O B U S I N E S S · AVATRATECH
                </Text>
                <Heading
                  id="home-hero-title"
                  level={1}
                  style={{
                    color: "#FFFFFF",
                    fontSize: "clamp(2.75rem, 5.1vw, 5rem)",
                    fontWeight: 900,
                    lineHeight: 0.98,
                    letterSpacing: "-0.055em",
                    maxWidth: "12ch",
                    margin: 0,
                  }}
                >
                  <span style={{ display: "block" }}>{sw ? "Endesha biashara yako" : "Run your business"}</span>
                  <span style={{ display: "block", color: theme.colors.primary }}>
                    {sw ? "kwa mfumo mmoja." : "with one connected system."}
                  </span>
                </Heading>
                <Text color="#FFFFFF" size={theme.typography.body.fontSize} style={{ maxWidth: "38rem", lineHeight: 1.75 }}>
                  {sw
                    ? "Simamia bidhaa, stock, oda, malipo na wateja sehemu moja. Pata mwonekano wa shughuli zako na uelekeze timu yako kwa urahisi."
                    : "Manage products, inventory, orders, payments and customers in one workspace. Get a clearer view of daily operations and keep your team moving."}
                </Text>
                <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
                  <Button size="lg" onClick={() => navigate("/signup")} rightIcon={<AppIcon name="chevronRight" size={theme.iconSizes.toolbar} aria-hidden="true" />}>
                    {t("getStarted")}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/features")} style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.8)" }}>
                    {sw ? "Chunguza vipengele" : "Explore features"}
                  </Button>
                  <Button size="lg" variant="ghost" onClick={() => jumpTo("solutions")} style={{ color: "#FFFFFF" }}>
                    {sw ? "Tazama suluhisho" : "See solutions"} ↓
                  </Button>
                </Flex>
              </Stack>
            </section>

            <section aria-labelledby="home-capabilities-title" style={sectionStyle}>
              <Flex align="end" justify="space-between" gap={theme.spacing.section} wrap="wrap" style={{ marginBottom: theme.spacing.section }}>
                <Stack spacing={theme.spacing.inline} style={{ maxWidth: "42rem" }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "JUKWAA MOJA" : "ONE BUSINESS WORKSPACE"}</Text>
                  <Heading id="home-capabilities-title" level={2} style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    {sw ? "Kila siku ya biashara, kwa mpangilio." : "Your everyday business, organised."}
                  </Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75 }}>
                    {sw ? "Kuanzia bidhaa na stock hadi mauzo na timu, anza na msingi unaohitaji kisha chunguza uwezo wote." : "From products and stock to sales and team operations, start with the essentials and explore the full platform."}
                  </Text>
                </Stack>
                <Link href="/features" color={theme.colors.primary}>{sw ? "Vipengele vyote" : "All features"} →</Link>
              </Flex>
              <Flex gap={theme.spacing.inline} wrap="wrap">
                {([
                  { icon: "package" as const, title: sw ? "Bidhaa na stock" : "Products & inventory", body: sw ? "Panga katalogi na ufuatilie mienendo ya stock." : "Organise your catalogue and track inventory movement." },
                  { icon: "receipt" as const, title: sw ? "Oda na mauzo" : "Orders & sales", body: sw ? "Weka oda na shughuli za mauzo katika mtiririko mmoja." : "Keep orders and sales activity in a consistent workflow." },
                  { icon: "users" as const, title: sw ? "Wateja na timu" : "Customers & teams", body: sw ? "Fuatilia rekodi za wateja na ruhusa za washiriki." : "Keep customer records and team access organised." },
                ]).map((item) => (
                  <Stack key={item.title} spacing={theme.spacing.inline} style={{ flex: "1 1 15rem", minWidth: 0, padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface }}>
                    <AppIcon name={item.icon} size={theme.iconSizes.card} color={theme.colors.primary} aria-hidden="true" />
                    <Heading level={3}>{item.title}</Heading>
                    <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>{item.body}</Text>
                  </Stack>
                ))}
              </Flex>
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
                  <Link href="/features" color={theme.colors.primary}>
                    {sw ? "Jifunze kuhusu vipengele vya AI" : "Learn about AI capabilities"} →
                  </Link>
                </Stack>
                <img
                  src={aiSalesAgent}
                  alt={sw ? "Picha ya suluhisho la msaidizi wa mauzo wa AI" : "AI sales assistant solution"}
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

            <section aria-labelledby="pricing-title" style={sectionStyle}>
              <Flex
                align="end"
                justify="space-between"
                gap={theme.spacing.section}
                wrap="wrap"
                style={{ marginBottom: theme.spacing.section }}
              >
                <Stack spacing={theme.spacing.inline} style={{ maxWidth: "42rem" }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">
                    {sw ? "BEI NA MIPANGO" : "PRICING"}
                  </Text>
                  <Heading id="pricing-title" level={2} style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}>
                    {sw ? "Bei zinazoendana na hatua ya biashara yako." : "Pricing that grows with your business."}
                  </Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75 }}>
                    {sw
                      ? "Anza na mpango unaokufaa na badili kadri biashara inavyokua."
                      : "Choose the plan that fits today and move up as your business grows."}
                  </Text>
                </Stack>
                <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                  {sw ? "Angalia mipango yote" : "Explore all plans"} →
                </Button>
              </Flex>
              <PricingSection compact />
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
