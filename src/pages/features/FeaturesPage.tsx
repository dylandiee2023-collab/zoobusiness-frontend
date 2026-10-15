import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { AppIcon, type AppIconName } from "@/design-system/icons";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { useLanguage } from "@/app/language";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import aiSalesAgent from "@/assets/images/ai-sales-agent.webp";
import shopOwner from "@/assets/images/woman-left-shoppings-with-many-bags.webp";

type FeatureItem = {
  icon: AppIconName;
  title: string;
  description: string;
};

function FeaturesPageContent() {
  const navigate = useNavigate();
  const { theme, mode } = useTheme();
  const { dimensions } = useLayout();
  const { language } = useLanguage();
  const sw = language === "sw";
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const copy = {
    eyebrow: sw ? "JUKWAA LA BIASHARA" : "THE BUSINESS OPERATING SPACE",
    titleA: sw ? "Endesha biashara yako." : "Run your business.",
    titleB: sw ? "Unganisha kila kitu." : "Bring everything together.",
    intro: sw
      ? "ZooBusiness inakusanya shughuli muhimu za biashara sehemu moja—kuanzia bidhaa na stock hadi oda, malipo na wateja."
      : "ZooBusiness brings the everyday work of running a business into one connected workspace—from products and stock to orders, payments and customer relationships.",
    primary: sw ? "Anza kutumia" : "Get started",
    secondary: sw ? "Angalia suluhisho" : "Explore solutions",
    coreEyebrow: sw ? "VIPENGELE VYA MSINGI" : "CORE CAPABILITIES",
    coreTitle: sw ? "Udhibiti zaidi. Kazi zisizotawanyika." : "More control. Less scattered work.",
    coreBody: sw
      ? "Tumia mfumo mmoja kufuatilia kazi za kila siku, badala ya kutegemea zana tofauti zisizoshirikiana."
      : "Keep core workflows in one place instead of relying on disconnected tools and manual hand-offs.",
    solutionsEyebrow: sw ? "SULUHISHO KWA VITENDO" : "SOLUTIONS IN PRACTICE",
    aiTitle: sw ? "Msaidizi wa mauzo wa AI" : "An AI sales assistant",
    aiBody: sw
      ? "Tumia uwezo wa AI kusaidia mazungumzo ya wateja na taarifa za maudhui zinazopatikana kwenye workspace. Uwezo wa automation hutegemea usanidi uliopo."
      : "Use AI-assisted customer conversations with content available to the workspace. The actions it can take depend on the integrations and automation rules actually configured.",
    shopTitle: sw ? "Huduma bora kwa wateja na oda" : "A smoother customer buying journey",
    shopBody: sw
      ? "Panga bidhaa, fuatilia oda na rekodi za malipo kwa mtiririko unaoeleweka. WhatsApp inaweza kutumika pale channel husika inapounganishwa."
      : "Present products clearly and keep order and payment activity organised. WhatsApp workflows are available where the channel has been connected and configured.",
    operationsTitle: sw ? "Shughuli za biashara, sehemu moja" : "Everyday operations, connected",
    operationsBody: sw
      ? "Panga bidhaa, stock, oda, manunuzi, matumizi na uhamisho wa stock kulingana na uwezo unaopatikana kwenye workspace yako."
      : "Organise products, inventory, orders, purchases, expenses and stock movements using the capabilities available to your workspace.",
    customerTitle: sw ? "Wateja na rekodi za mauzo" : "Customers and sales records",
    customerBody: sw
      ? "Hifadhi taarifa za wateja na ufuatilie historia ya oda na malipo. Usimamizi kamili wa madeni unahitaji kuthibitisha uwezo wa credit ledger."
      : "Keep customer information alongside order and payment history. A full customer-credit ledger is not represented as available until that workflow is verified.",
    paymentsTitle: sw ? "Malipo yenye muktadha" : "Payments with context",
    paymentsBody: sw
      ? "Unganisha rekodi za malipo na oda, na tumia njia za malipo zilizowekwa na biashara yako."
      : "Keep payment records connected to orders and use the payment methods configured for your business.",
    peopleTitle: sw ? "Timu, majukumu na matawi" : "Teams, roles and branches",
    peopleBody: sw
      ? "Simamia washiriki wa workspace, mialiko, majukumu na ugawaji wa matawi kulingana na ruhusa."
      : "Manage workspace members, invitations, roles and branch assignments according to access permissions.",
    inventoryTitle: sw ? "Bidhaa na stock" : "Products and inventory",
    inventoryBody: sw
      ? "Panga bidhaa, anza kufuatilia salio na kagua mienendo ya stock katika maeneo ya biashara."
      : "Organise product information, track stock levels and review inventory movements across business locations.",
    ordersTitle: sw ? "Oda na mauzo" : "Orders and sales",
    ordersBody: sw
      ? "Fuatilia oda na hali zake, na tumia POS pale inapotumika kwenye workflow ya biashara."
      : "Follow order status and use the point-of-sale workflow where it fits your operation.",
    expensesTitle: sw ? "Manunuzi na matumizi" : "Purchases and expenses",
    expensesBody: sw
      ? "Rekodi manunuzi na matumizi ili kuweka shughuli za uendeshaji katika mfumo unaofuatilika."
      : "Record purchases and expenses so operational activity has a consistent place to live.",
    branchesTitle: sw ? "Biashara yenye matawi" : "Multi-branch operations",
    branchesBody: sw
      ? "Tumia workspace na matawi kwa mpangilio wa biashara yako, ukiweka udhibiti wa upatikanaji kulingana na ruhusa."
      : "Structure workspaces and branches around your business, with access controlled by permissions.",
    automationTitle: sw ? "Automation bila ahadi za kubuni" : "Automation, grounded in real workflows",
    automationBody: sw
      ? "Msingi wa schema ya automation upo kwenye backend, lakini kila aina ya rule na action inahitaji kuthibitishwa kabla ya kutangazwa kuwa imekamilika."
      : "Automation rule structures exist in the backend, but each trigger and action must be verified before being described as a complete, ready-to-use workflow.",
    ctaTitle: sw ? "Anza kujenga mfumo wa biashara unaokua nawe." : "Build a more connected way to run your business.",
    ctaBody: sw
      ? "Fungua akaunti ili kuanza usanidi wa biashara yako na kuchunguza uwezo unaopatikana."
      : "Create an account to start setting up your business and explore the capabilities available to your workspace.",
    contact: sw ? "Wasiliana na AvatraTech" : "Talk to AvatraTech",
    footer: sw ? "Jukwaa la biashara lililotengenezwa na AvatraTech" : "Business operations by AvatraTech",
    home: sw ? "Nyumbani" : "Home",
    features: sw ? "Vipengele" : "Features",
    solutions: sw ? "Suluhisho" : "Solutions",
    pricing: sw ? "Bei" : "Pricing",
    academy: "Academy",
    login: sw ? "Ingia" : "Log in",
  };

  const features: FeatureItem[] = [
    { icon: "package", title: sw ? "Bidhaa na katalogi" : "Products and catalogue", description: sw ? "Panga taarifa za bidhaa na variants zake." : "Keep product information and variants organised." },
    { icon: "warehouse", title: copy.inventoryTitle, description: copy.inventoryBody },
    { icon: "cart", title: copy.ordersTitle, description: copy.ordersBody },
    { icon: "creditCard", title: copy.paymentsTitle, description: copy.paymentsBody },
    { icon: "users", title: copy.customerTitle, description: copy.customerBody },
    { icon: "receipt", title: copy.expensesTitle, description: copy.expensesBody },
    { icon: "boxes", title: copy.branchesTitle, description: copy.branchesBody },
    { icon: "users", title: copy.peopleTitle, description: copy.peopleBody },
    { icon: "bot", title: copy.automationTitle, description: copy.automationBody },
  ];

  const cardStyle = {
    flex: "1 1 17rem",
    minWidth: 0,
    padding: theme.spacing.card,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.card,
    background: theme.colors.surface,
    boxShadow: theme.shadows.card,
  } as const;

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <Link href="/" aria-label="ZooBusiness home">
        <img src={logo} alt="ZooBusiness" style={{ display: "block", maxWidth: "10rem", maxHeight: "2.5rem", width: "auto" }} />
      </Link>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/">{copy.home}</Link>
        <Link href="/features" aria-current="page">{copy.features}</Link>
        <Link href="/#solutions">{copy.solutions}</Link>
        <Link href="/pricing">{copy.pricing}</Link>
        <Link href="/academy">{copy.academy}</Link>
      </Flex>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/login">{copy.login}</Link>
        <Button onClick={() => navigate("/signup")}>{copy.primary}</Button>
      </Flex>
    </Flex>
  );

  const footer = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}>
      <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>© {new Date().getFullYear()} AvatraTech · {copy.footer}</Text>
      <Link href="mailto:support@avatratech.com">support@avatratech.com</Link>
    </Flex>
  );

  return (
    <PublicShell header={header} footer={footer}>
      <main>
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={theme.spacing.section} style={{ paddingBlock: theme.spacing.section }}>
            <section aria-labelledby="features-hero-title" style={{
              position: "relative", isolation: "isolate", overflow: "hidden",
              display: "flex", alignItems: "center", minHeight: "clamp(25rem, 52vw, 39rem)",
              padding: "clamp(2rem, 6vw, 5rem)", borderRadius: theme.radius.card,
              color: "#FFFFFF",
              background: "linear-gradient(110deg, rgba(8, 22, 15, .94), rgba(8, 22, 15, .66) 62%, rgba(8, 22, 15, .28))",
            }}>
              <Stack spacing={theme.spacing.section} style={{ maxWidth: "52rem", alignItems: "flex-start" }}>
                <Text color={theme.colors.primary} weight={700} transform="uppercase">{copy.eyebrow}</Text>
                <Heading id="features-hero-title" level={1} style={{ color: "#FFFFFF", fontSize: "clamp(2.7rem, 6vw, 5.7rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-.05em", margin: 0 }}>
                  {copy.titleA}<br /><span style={{ color: theme.colors.primary }}>{copy.titleB}</span>
                </Heading>
                <Text color="#FFFFFF" style={{ maxWidth: "42rem", lineHeight: 1.7 }}>{copy.intro}</Text>
                <Flex gap={theme.spacing.inline} wrap="wrap">
                  <Button size="lg" onClick={() => navigate("/signup")}>{copy.primary}</Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/#solutions")} style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,.7)" }}>{copy.secondary}</Button>
                </Flex>
              </Stack>
            </section>

            <Stack spacing={theme.spacing.inline} style={{ maxWidth: "48rem" }}>
              <Text color={theme.colors.primary} weight={700} transform="uppercase">{copy.coreEyebrow}</Text>
              <Heading level={2} style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-.035em" }}>{copy.coreTitle}</Heading>
              <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>{copy.coreBody}</Text>
            </Stack>

            <Flex gap={theme.spacing.inline} wrap="wrap">
              {features.map((feature) => (
                <Stack key={feature.title} spacing={theme.spacing.inline} style={cardStyle}>
                  <Flex align="center" justify="center" style={{ width: "3rem", height: "3rem", borderRadius: theme.radius.card, background: theme.colors.surfaceSecondary, color: theme.colors.primary }}>
                    <AppIcon name={feature.icon} size={theme.iconSizes.card} aria-hidden="true" />
                  </Flex>
                  <Heading level={3}>{feature.title}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.65 }}>{feature.description}</Text>
                </Stack>
              ))}
            </Flex>

            <Stack id="solutions" spacing={theme.spacing.section} style={{ scrollMarginTop: theme.componentSizes.topbarHeight }}>
              <Stack spacing={theme.spacing.inline} style={{ maxWidth: "48rem" }}>
                <Text color={theme.colors.primary} weight={700} transform="uppercase">{copy.solutionsEyebrow}</Text>
                <Heading level={2} style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", letterSpacing: "-.035em" }}>{sw ? "Kutoka mazungumzo hadi shughuli zinazoeleweka." : "From customer conversations to organised operations."}</Heading>
              </Stack>
              <Flex align="center" gap={theme.spacing.section} wrap="wrap" style={{ padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface }}>
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 20rem", minWidth: 0 }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">AI · CUSTOMER ASSISTANCE</Text>
                  <Heading level={2}>{copy.aiTitle}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>{copy.aiBody}</Text>
                </Stack>
                <img src={aiSalesAgent} alt={sw ? "Picha ya suluhisho la msaidizi wa mauzo wa AI" : "AI sales assistant solution"} loading="lazy" style={{ display: "block", flex: "1 1 20rem", width: "100%", maxWidth: "34rem", minWidth: 0, height: "auto", objectFit: "contain", borderRadius: theme.radius.card }} />
              </Flex>
              <Flex align="center" gap={theme.spacing.section} wrap="wrap" style={{ padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface }}>
                <img src={shopOwner} alt={sw ? "Mmiliki wa duka akiwa na mifuko ya bidhaa" : "Shopper carrying shopping bags"} loading="lazy" style={{ display: "block", flex: "1 1 20rem", width: "100%", maxWidth: "34rem", minWidth: 0, height: "auto", objectFit: "cover", borderRadius: theme.radius.card }} />
                <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 20rem", minWidth: 0 }}>
                  <Text color={theme.colors.primary} weight={700} transform="uppercase">CUSTOMER EXPERIENCE</Text>
                  <Heading level={2}>{copy.shopTitle}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.7 }}>{copy.shopBody}</Text>
                </Stack>
              </Flex>
            </Stack>

            <Flex align="center" justify="space-between" gap={theme.spacing.section} wrap="wrap" style={{ padding: "clamp(1.5rem, 4vw, 3rem)", borderRadius: theme.radius.card, background: theme.colors.surfaceSecondary }}>
              <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 25rem" }}>
                <Heading level={2}>{copy.ctaTitle}</Heading>
                <Text color={theme.colors.textSecondary}>{copy.ctaBody}</Text>
              </Stack>
              <Flex gap={theme.spacing.inline} wrap="wrap">
                <Button size="lg" onClick={() => navigate("/signup")}>{copy.primary}</Button>
                <Button size="lg" variant="outline" onClick={() => window.location.assign("mailto:support@avatratech.com")}>{copy.contact}</Button>
              </Flex>
            </Flex>
          </Stack>
        </Container>
      </main>
    </PublicShell>
  );
}

export function FeaturesPage() {
  return <LayoutProvider layout="public"><FeaturesPageContent /></LayoutProvider>;
}
