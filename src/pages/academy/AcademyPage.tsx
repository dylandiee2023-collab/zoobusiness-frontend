import { Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { LayoutProvider, useLayout } from "@/layout-engine";
import { useLanguage } from "@/app/language";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

function AcademyContent() {
  const { theme } = useTheme();
  const { dimensions } = useLayout();
  const { language } = useLanguage();
  const logo = theme.mode === "dark" ? lightLogo : darkLogo;
  const sw = language === "sw";
  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <Link href="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ display: "block", maxWidth: "10rem", maxHeight: "2.5rem", width: "auto" }} /></Link>
      <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
        <Link href="/">{sw ? "Nyumbani" : "Home"}</Link>
        <Link href="/#features">{sw ? "Vipengele" : "Features"}</Link>
        <Link href="/pricing">{sw ? "Bei" : "Pricing"}</Link>
        <Link href="/academy" aria-current="page">Academy</Link>
      </Flex>
    </Flex>
  );
  const footer = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}>
      <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>© {new Date().getFullYear()} AvatraTech. {sw ? "Haki zote zimehifadhiwa." : "All rights reserved."}</Text>
      <Link href="mailto:support@avatratech.com">support@avatratech.com</Link>
    </Flex>
  );
  const categories = sw
    ? [{ title: "Kuanzia na ZooBusiness", body: "Video za utangulizi na usanidi wa akaunti." }, { title: "Bidhaa na stoo", body: "Jifunze kupanga bidhaa na kufuatilia stoo." }, { title: "Oda na malipo", body: "Mafunzo ya mtiririko wa oda na malipo." }, { title: "Uendeshaji wa biashara", body: "Mbinu za kutumia zana za ZooBusiness." }]
    : [{ title: "Getting started", body: "Introduction and account setup videos." }, { title: "Products & inventory", body: "Learn to organise products and track stock." }, { title: "Orders & payments", body: "Guides to order and payment workflows." }, { title: "Business operations", body: "Learn how to use ZooBusiness tools." }];
  return (
    <PublicShell header={header} footer={footer}>
      <main>
        <Container maxWidth={dimensions.maxContentWidth} padding={theme.spacing.page} center>
          <Stack spacing={theme.spacing.section} style={{ paddingBlock: theme.spacing.section }}>
            <Stack spacing={theme.spacing.inline} style={{ maxWidth: "48rem" }}>
              <Text color={theme.colors.primary} weight={700} transform="uppercase">AVATRATECH ACADEMY</Text>
              <Heading level={1}>{sw ? "Jifunze. Jenga. Kuza biashara yako." : "Learn. Build. Grow your business."}</Heading>
              <Text color={theme.colors.textSecondary}>{sw ? "Mafunzo ya video yatakayokuongoza kutumia ZooBusiness kwa ufanisi. Ukurasa huu umeandaliwa kupokea video rasmi za AvatraTech." : "Video lessons to help you get more from ZooBusiness. This academy is ready for official AvatraTech training videos."}</Text>
            </Stack>
            <Flex gap={theme.spacing.inline} wrap="wrap">
              {categories.map((item) => (
                <Stack key={item.title} spacing={theme.spacing.inline} style={{ flex: "1 1 16rem", minWidth: 0, padding: theme.spacing.card, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface }}>
                  <Flex align="center" justify="center" style={{ minHeight: "9rem", borderRadius: theme.radius.card, background: theme.colors.surfaceSecondary }}>
                    <Text color={theme.colors.primary} weight={700}>▶</Text>
                  </Flex>
                  <Heading level={3}>{item.title}</Heading>
                  <Text color={theme.colors.textSecondary}>{item.body}</Text>
                  <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>{sw ? "Video zitaongezwa hapa" : "Videos will appear here"}</Text>
                </Stack>
              ))}
            </Flex>
            <Stack spacing={theme.spacing.inline} style={{ padding: theme.spacing.card, borderRadius: theme.radius.card, background: theme.colors.surfaceSecondary }}>
              <Heading level={2}>{sw ? "Mafunzo yanakuja hivi karibuni" : "Training videos are coming soon"}</Heading>
              <Text color={theme.colors.textSecondary}>{sw ? "Hakuna video iliyochapishwa bado. Video zitaonekana hapa zitakapowekwa rasmi." : "No videos have been published yet. Official lessons will appear here when they are released."}</Text>
            </Stack>
          </Stack>
        </Container>
      </main>
    </PublicShell>
  );
}
export function AcademyPage() {
  return <LayoutProvider layout="public"><AcademyContent /></LayoutProvider>;
}
