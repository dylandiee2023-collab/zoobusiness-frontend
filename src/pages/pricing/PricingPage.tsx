import { Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { useLanguage } from "@/app/language";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

function PricingContent() {
  const { theme } = useTheme();
  const { dimensions } = useLayout();
  const { language } = useLanguage();
  const sw = language === "sw";
  const logo = theme.mode === "dark" ? lightLogo : darkLogo;
  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <Link href="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ display: "block", maxWidth: "10rem", maxHeight: "2.5rem", width: "auto" }} /></Link>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/">{sw ? "Nyumbani" : "Home"}</Link><Link href="/#features">{sw ? "Vipengele" : "Features"}</Link><Link href="/pricing" aria-current="page">{sw ? "Bei" : "Pricing"}</Link><Link href="/academy">Academy</Link>
      </Flex>
    </Flex>
  );
  const footer = <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}><Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>© {new Date().getFullYear()} AvatraTech</Text><Link href="mailto:support@avatratech.com">support@avatratech.com</Link></Flex>;
  const plans = sw
    ? [{ title: "Bure", body: "Maelezo, mipaka ya matumizi na vipengele vitathibitishwa." }, { title: "Pro", body: "Mpango wa biashara unaohitaji zana zaidi; maelezo bado yanathibitishwa." }, { title: "Team", body: "Kwa timu zinazoshirikiana; uwezo na mipaka vitatangazwa baada ya uthibitisho." }, { title: "Enterprise", body: "Mahitaji ya biashara kubwa yatajadiliwa na timu ya AvatraTech." }]
    : [{ title: "Free", body: "Included features and usage limits will be confirmed." }, { title: "Pro", body: "For businesses needing more tools; details are being finalised." }, { title: "Team", body: "For collaborative teams; limits and features will be confirmed." }, { title: "Enterprise", body: "Contact AvatraTech to discuss business requirements." }];
  return (
    <PublicShell header={header} footer={footer}>
      <main>
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={theme.spacing.section} style={{ paddingBlock: theme.spacing.section }}>
            <Stack spacing={theme.spacing.inline} style={{ textAlign: "center", alignItems: "center", maxWidth: "52rem", alignSelf: "center" }}>
              <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "MIPANGO YA ZOOBUSINESS" : "ZOOBUSINESS PLANS"}</Text>
              <Heading level={1}>{sw ? "Chagua mpango unaofaa biashara yako." : "A plan that fits your business."}</Heading>
              <Text color={theme.colors.textSecondary}>{sw ? "Tunathibitisha bei na mipaka ya kila mpango. Hatutaonyesha bei za kubuni." : "Pricing and plan limits are being verified. We will not publish placeholder prices as real prices."}</Text>
            </Stack>
            <Flex gap={theme.spacing.inline} wrap="wrap">
              {plans.map((plan) => (
                <Stack key={plan.title} spacing={theme.spacing.inline} style={{ flex: "1 1 15rem", minWidth: 0, padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface }}>
                  <Heading level={2}>{plan.title}</Heading>
                  <Text color={theme.colors.textSecondary}>{plan.body}</Text>
                  <Text color={theme.colors.primary} weight={700}>{sw ? "Bei itatangazwa baada ya uthibitisho" : "Pricing to be announced after verification"}</Text>
                </Stack>
              ))}
            </Flex>
            <Stack spacing={theme.spacing.inline} style={{ padding: theme.spacing.card, borderRadius: theme.radius.card, background: theme.colors.surfaceSecondary }}>
              <Heading level={2}>{sw ? "Unahitaji kujua zaidi?" : "Need a pricing update?"}</Heading>
              <Text color={theme.colors.textSecondary}>{sw ? "Wasiliana na AvatraTech ili kujadili mahitaji ya biashara yako." : "Contact AvatraTech to discuss your business requirements and upcoming plan details."}</Text>
              <Link href="mailto:support@avatratech.com" color={theme.colors.primary}>support@avatratech.com</Link>
            </Stack>
          </Stack>
        </Container>
      </main>
    </PublicShell>
  );
}
export function PricingPage() {
  return <LayoutProvider layout="public"><PricingContent /></LayoutProvider>;
}
