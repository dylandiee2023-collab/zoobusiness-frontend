import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, register } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function SignUpPage() {
  const navigate = useNavigate();
  const { theme, mode, toggleMode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <Flex align="center" gap={theme.spacing.inline}>
        <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
          <option value="en">EN</option><option value="sw">SW</option>
        </select>
        <Button variant="ghost" size="sm" aria-label={mode === "dark" ? t("themeLight") : t("themeDark")} onClick={toggleMode}><AppIcon name="moon" size={theme.iconSizes.toolbar} /></Button>
      </Flex>
    </Flex>
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) { setError(t("requiredFields")); return; }
    if (password !== confirmPassword) { setError(t("passwordMismatch")); return; }
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password, language);
      navigate(`/verify-email?emailAddress=${encodeURIComponent(email.trim())}`, { replace: true });
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally { setBusy(false); }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="36rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{t("signup")}</Text>
            <Heading level={1}>{t("signupTitle")}</Heading>
            <Text color={theme.colors.textSecondary}>{t("signupBody")}</Text>
          </Stack>
          <form onSubmit={submit}>
            <Stack spacing={theme.spacing.form}>
              <Stack spacing={theme.spacing.inline}><Text>{t("fullName")}</Text><Input name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} fullWidth /></Stack>
              <Stack spacing={theme.spacing.inline}><Text>{t("emailAddress")}</Text><Input type="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} fullWidth /></Stack>
              <Stack spacing={theme.spacing.inline}><Text>{t("password")}</Text><Input type="password" name="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth /></Stack>
              <Stack spacing={theme.spacing.inline}><Text>{t("confirmPassword")}</Text><Input type="password" name="confirmPassword" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} fullWidth /></Stack>
              {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
              <Button type="submit" fullWidth loading={busy}>{busy ? t("loading") : t("submitSignup")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}>{t("alreadyAccount")} <Link href="/login" color={theme.colors.primary}>{t("signIn")}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
