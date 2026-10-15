import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, register, resendVerification, saveAuthSession, verifyEmail } from "@/app/auth/auth-api";
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
  const [code, setCode] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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
  const footer = <Flex align="center" justify="space-between" gap={theme.spacing.inline} wrap="wrap" style={{ minHeight: theme.componentSizes.bottomNavigationHeight }}><Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>© {new Date().getFullYear()} AvatraTech</Text><Link href="mailto:support@avatratech.com">support@avatratech.com</Link></Flex>;

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) { setError(t("requiredFields")); return; }
    if (password !== confirmPassword) { setError(t("passwordMismatch")); return; }
    setBusy(true);
    try {
      await register(name.trim(), email.trim(), password, language);
      setVerificationStep(true);
      setNotice(t("verifyNotice"));
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  async function submitVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!/^\d{6}$/.test(code)) { setError(t("requiredFields")); return; }
    setBusy(true);
    try {
      const session = await verifyEmail(email.trim(), code, language);
      saveAuthSession(session);
      setNotice(t("welcomeBack"));
      navigate("/business-setup", { replace: true });
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  async function resendCode() {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await resendVerification(email.trim(), language);
      setNotice(t("verifyNotice"));
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  return (
    <PublicShell header={header} footer={footer}>
      <Container maxWidth="36rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={theme.typography.body.fontWeight} transform="uppercase">{verificationStep ? t("email") : t("signup")}</Text>
            <Heading level={1}>{verificationStep ? t("verifyTitle") : t("signupTitle")}</Heading>
            <Text color={theme.colors.textSecondary}>{verificationStep ? t("verifyInstructions") : t("signupBody")}</Text>
          </Stack>
          {!verificationStep ? (
            <form onSubmit={submitRegistration}>
              <Stack spacing={theme.spacing.form}>
                <Stack spacing={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("fullName")}</Text>
                  <Input name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} fullWidth />
                </Stack>
                <Stack spacing={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("email")}</Text>
                  <Input type="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
                </Stack>
                <Stack spacing={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("password")}</Text>
                  <Input type="password" name="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                </Stack>
                <Stack spacing={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("confirmPassword")}</Text>
                  <Input type="password" name="confirmPassword" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} fullWidth />
                </Stack>
                {error ? <Text color={theme.colors.danger}>{error}</Text> : null}
                {notice ? <Text color={theme.colors.primary}>{notice}</Text> : null}
                <Button type="submit" fullWidth loading={busy}>{busy ? t("loading") : t("submitSignup")}</Button>
              </Stack>
            </form>
          ) : (
            <form onSubmit={submitVerification}>
              <Stack spacing={theme.spacing.form}>
                <Text color={theme.colors.textSecondary}>{email}</Text>
                <Stack spacing={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("verificationCode")}</Text>
                  <Input inputMode="numeric" autoComplete="one-time-code" name="code" required minLength={6} maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} fullWidth />
                </Stack>
                {error ? <Text color={theme.colors.danger}>{error}</Text> : null}
                {notice ? <Text color={theme.colors.primary}>{notice}</Text> : null}
                <Button type="submit" fullWidth loading={busy}>{busy ? t("loading") : t("verifyButton")}</Button>
                <Button type="button" variant="outline" fullWidth disabled={busy} onClick={resendCode}>{t("resendCode")}</Button>
              </Stack>
            </form>
          )}
          <Text color={theme.colors.textSecondary}>{t("alreadyAccount")} <Link href="/login" color={theme.colors.primary}>{t("signIn")}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
