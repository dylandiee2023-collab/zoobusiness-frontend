import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { AppIcon } from "@/design-system/icons";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage } from "@/app/auth/auth-api";
import { ApiError } from "@/platform/api";
import { usePlatform } from "@/platform/providers/use-platform";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function LoginPage() {
  const navigate = useNavigate();
  const platform = usePlatform();
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
        <Button variant="ghost" size="sm" aria-label={mode === "dark" ? t("themeLight") : t("themeDark")} onClick={toggleMode}><AppIcon name="moon" size={theme.iconSizes.toolbar} /></Button>
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
    console.info("[ZooBusiness Login] Submit handler started");
    try {
      // Use the platform authentication service so protected routes, the API
      // client, and workspace providers receive the same authenticated state.
      await platform.authentication.login(email.trim(), password);
      const user = platform.authentication.user;
      if (!user) throw new Error("LOGIN_USER_MISSING");

      if (!user.emailVerified) {
        window.sessionStorage.setItem("zoobusiness.pendingVerificationEmail", email.trim());
        navigate("/verify-email", { replace: true });
        return;
      }

      let setupComplete = false;
      try {
        const workspace = await platform.api.get<{ business_category_id: string | null }>(
          "/api/workspaces/current",
        );
        setupComplete = Boolean(workspace.business_category_id);
      } catch (caught) {
        // A user without a workspace has not completed setup yet.
        if (!(caught instanceof ApiError) || caught.status !== 404) throw caught;
      }

      const destination = setupComplete ? "/dashboard" : "/business-setup";
      console.info("[ZooBusiness Login] Redirecting after login", {
        emailVerified: user.emailVerified,
        setupComplete,
        destination,
      });
      navigate(destination, { replace: true });
    } catch (caught) {
      const message = authErrorMessage(caught, language);
      console.error("[ZooBusiness Login] Login flow failed", { message });
      if (message.toLowerCase().includes("email verification is required")) {
        window.sessionStorage.setItem("zoobusiness.pendingVerificationEmail", email.trim());
        navigate("/verify-email", { replace: true });
        return;
      }
      setError(message);
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
                <Text weight={theme.typography.body.fontWeight}>{t("emailAddress")}</Text>
                <Input type="email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              </Stack>
              <Stack spacing={theme.spacing.inline}>
                <Flex justify="space-between" align="center" gap={theme.spacing.inline}>
                  <Text weight={theme.typography.body.fontWeight}>{t("password")}</Text>
                  <Link href="/forgot-password" color={theme.colors.primary} style={{ fontSize: theme.typography.bodySmall.fontSize }}>{t("forgotPassword")}</Link>
                </Flex>
                <Input type="password" name="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
              </Stack>
              {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
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
