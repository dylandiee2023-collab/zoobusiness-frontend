import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, requestPasswordReset } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { theme, mode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
        <option value="en">EN</option><option value="sw">SW</option>
      </select>
    </Flex>
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice(""); setBusy(true);
    try {
      await requestPasswordReset(email.trim(), language);
      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally { setBusy(false); }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{language === "sw" ? "UREJESHAJI WA AKAUNTI" : "ACCOUNT RECOVERY"}</Text>
            <Heading level={1}>{language === "sw" ? "Umesahau nenosiri?" : "Forgot your password?"}</Heading>
            <Text color={theme.colors.textSecondary}>{language === "sw" ? "Weka barua pepe yako ili upokee msimbo wa kurejesha nenosiri." : "Enter your email and we'll send a password reset code if the account is eligible."}</Text>
          </Stack>
          <form onSubmit={submit}>
            <Stack spacing={theme.spacing.form}>
              <Stack spacing={theme.spacing.inline}>
                <Text>{t("email")}</Text>
                <Input type="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              </Stack>
              {error ? <Text color={theme.colors.danger}>{error}</Text> : null}
              {notice ? <Text color={theme.colors.primary}>{notice}</Text> : null}
              <Button type="submit" fullWidth loading={busy}>{busy ? t("loading") : (language === "sw" ? "Tuma msimbo" : "Send reset code")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}><Link href="/login" color={theme.colors.primary}>{language === "sw" ? "Rudi kuingia" : "Back to login"}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
