import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, login, saveAuthSession } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function LoginPage() {
  const navigate = useNavigate();
  const { theme, mode, toggleMode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <Flex align="center" gap={theme.spacing.inline}>
        <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
          <option value="en">EN</option><option value="sw">SW</option>
        </select>
        <Button variant="ghost" size="sm" aria-label={mode === "dark" ? t("themeLight") : t("themeDark")} onClick={toggleMode}><AppIcon name={mode === "dark" ? "check" : "settings"} size={theme.iconSizes.toolbar} /></Button>
      </Flex>
    </Flex>
  );
  const footer = <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}><Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>© {new Date().getFullYear()} AvatraTech</Text><Link href="mailto:support@avatratech.com">support@avatratech.com</Link></Flex>;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email.trim() || !password) { setError(t("requiredFields")); return; }
    setBusy(true);
    try {
      const session = await login(email.trim(), password, language);
      saveAuthSession(session);
      setNotice(session.user.emailVerified ? t("welcomeBack") : t("verifyNotice"));
      navigate("/", { replace: true });
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  return (
    <PublicShell header={header} footer={footer}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase">{t("welcomeBack")}</Text>
            <Heading level={1}>{t("login")}</Heading>
            <Text color={theme.colors.textSecondary}>{t("loginBody")}</Text>
          </Stack>
          <form onSubmit={submit}>
            <Stack spacing={theme.spacing.form}>
              <Stack spacing={theme.spacing.inline}>
                <Text weight={theme.typography.body.fontWeight}>{t("email")}</Text>
                <Input type="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              </Stack>
              <Stack spacing={theme.spacing.inline}>
                <Flex justify="space-between" align="center" gap={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("password")}</Text>
                  <Text size={theme.typography.bodySmall.fontSize} color={theme.colors.textSecondary}>{t("forgotPassword")}</Text>
                </Flex>
                <Input type="password" name="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
              </Stack>
              {error ? <Text color={theme.colors.danger}>{error}</Text> : null}
              {notice ? <Text color={theme.colors.primary}>{notice}</Text> : null}
              <Button type="submit" fullWidth loading={busy}>{busy ? t("loading") : t("submitLogin")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}>{t("noAccount")} <Link href="/signup" color={theme.colors.primary}>{t("createAccount")}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
