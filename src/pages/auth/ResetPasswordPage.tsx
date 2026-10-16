import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Link, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, passwordPolicyError, resetPassword } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, mode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const [email] = useState(searchParams.get("emailAddress") ?? searchParams.get("email") ?? "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const logo = mode === "dark" ? lightLogo : darkLogo;

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight, flexWrap: "wrap" }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
        <option value="en">EN</option><option value="sw">SW</option>
      </select>
    </Flex>
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email) {
      setError(language === "sw" ? "Barua pepe haipo. Anza tena kutoka ukurasa wa kurejesha nenosiri." : "The email address is missing. Start again from password recovery.");
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setError(language === "sw" ? "Weka msimbo wa tarakimu 6." : "Enter the 6-digit code.");
      return;
    }
    const passwordError = passwordPolicyError(password, language);
    if (passwordError) { setError(passwordError); return; }
    setBusy(true);
    try {
      await resetPassword(email.trim(), code, password, language);
      setNotice(language === "sw" ? "Nenosiri limebadilishwa. Unaweza kuingia sasa." : "Password updated. You can log in now.");
      window.setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: "clamp(1.25rem, 4vw, 2.5rem)", boxShadow: theme.shadows.card, minWidth: 0 }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{language === "sw" ? "WEKA NENOSIRI JIPYA" : "SET A NEW PASSWORD"}</Text>
            <Heading level={1}>{language === "sw" ? "Badilisha nenosiri" : "Reset your password"}</Heading>
            <Text color={theme.colors.textSecondary}>
              {language === "sw" ? "Weka msimbo uliotumwa kwa barua pepe na nenosiri jipya." : "Enter the code sent to your email and choose a new password."}
              {email ? <> <strong>{email}</strong></> : null}
            </Text>
          </Stack>
          {!email ? <Text color={theme.colors.danger} role="alert">{language === "sw" ? "Barua pepe haipo. Omba msimbo mpya kutoka ukurasa wa kurejesha nenosiri." : "The email address is missing. Request a new code from password recovery."}</Text> : null}
          <form onSubmit={submit}>
            <Stack spacing={theme.spacing.form}>
              <input type="hidden" name="email" value={email} />
              <Stack spacing={theme.spacing.inline}>
                <Text>{language === "sw" ? "Msimbo wa tarakimu 6" : "6-digit code"}</Text>
                <Input name="code" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} fullWidth />
              </Stack>
              <Stack spacing={theme.spacing.inline}>
                <Text>{t("password")}</Text>
                <Input name="password" type="password" autoComplete="new-password" required minLength={12} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                <Text color={theme.colors.textSecondary} size="0.875rem">{language === "sw" ? "Herufi 12 au zaidi, herufi kubwa na ndogo, namba na alama maalum." : "Use 12+ characters with uppercase, lowercase, a number and a special character."}</Text>
              </Stack>
              {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
              {notice ? <Text color={theme.colors.primary} role="status">{notice}</Text> : null}
              <Button type="submit" fullWidth loading={busy} disabled={!email}>{busy ? t("loading") : (language === "sw" ? "Hifadhi nenosiri jipya" : "Save new password")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}><Link href="/forgot-password" color={theme.colors.primary}>{language === "sw" ? "Omba msimbo mwingine" : "Request another code"}</Link>{" · "}<Link href="/login" color={theme.colors.primary}>{language === "sw" ? "Rudi kuingia" : "Back to login"}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
