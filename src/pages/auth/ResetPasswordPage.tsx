import { useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text, Input } from "@/design-system";
import { OtpCodeInput } from "@/pages/auth/OtpCodeInput";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, requestPasswordReset, resetPassword } from "@/app/auth/auth-api";
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
  const email = window.sessionStorage.getItem("zoobusiness.pendingPasswordResetEmail") ?? searchParams.get("email") ?? searchParams.get("emailAddress") ?? "";
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [completed, setCompleted] = useState(false);
  const logo = mode === "dark" ? lightLogo : darkLogo;
  const sw = language === "sw";

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const intervalId = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(intervalId);
  }, [secondsLeft]);

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: "1px solid " + theme.colors.border, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
        <option value="en">EN</option><option value="sw">SW</option>
      </select>
    </Flex>
  );

  function maskEmail(value: string) {
    const parts = value.split("@");
    if (parts.length !== 2) return value;
    return parts[0].slice(0, 1) + "•••@" + parts[1];
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email) { setError(sw ? "Barua pepe haipo kwenye kiungo hiki. Omba msimbo mpya." : "Email address is missing from this link. Request a new reset code."); return; }
    if (code.replace(/\D/g, "").length !== 6) { setError(sw ? "Weka msimbo wa tarakimu 6." : "Enter the 6-digit code."); return; }
    if (password.length < 8) { setError(sw ? "Nenosiri liwe na angalau herufi 8." : "Password must be at least 8 characters."); return; }
    setBusy(true);
    try {
      await resetPassword(email.trim(), code.replace(/\D/g, ""), password, language);
      window.sessionStorage.removeItem("zoobusiness.accessToken");
      window.sessionStorage.removeItem("zoobusiness.refreshToken");
      window.sessionStorage.removeItem("zoobusiness.user");
      window.sessionStorage.removeItem("zoobusiness.pendingPasswordResetEmail");
      setCompleted(true);
      setNotice(sw ? "Nenosiri limebadilishwa. Sasa unaweza kuingia." : "Password updated. You can now log in.");
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  async function resendCode() {
    if (!email) {
      setError(sw ? "Barua pepe haipo kwenye kiungo hiki. Rudi kwenye ukurasa wa kurejesha akaunti." : "Email address is missing. Return to account recovery.");
      return;
    }
    setError("");
    setNotice("");
    setResending(true);
    try {
      await requestPasswordReset(email.trim(), language);
      setCode("");
      setSecondsLeft(60);
      setNotice(sw ? "Ikiwa akaunti inastahili, msimbo mpya umetumwa." : "If the account is eligible, a new reset code has been sent.");
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setResending(false);
    }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: "1px solid " + theme.colors.border, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "WEKA NENOSIRI JIPYA" : "SET A NEW PASSWORD"}</Text>
            <Heading level={1}>{sw ? "Badilisha nenosiri" : "Reset your password"}</Heading>
            <Text color={theme.colors.textSecondary}>{sw ? "Weka msimbo uliotumwa kwa barua pepe na nenosiri jipya." : "Enter the code sent to your email and choose a new password. Codes expire after 10 minutes."}</Text>
          </Stack>
          {completed ? (
            <Stack spacing={theme.spacing.inline}>
              {notice ? <Text color={theme.colors.primary} role="status">{notice}</Text> : null}
              <Button type="button" fullWidth onClick={() => navigate("/login", { replace: true })}>{sw ? "Endelea kuingia" : "Continue to login"}</Button>
            </Stack>
          ) : (
            <form onSubmit={submit}>
              <Stack spacing={theme.spacing.form}>
                <Text color={theme.colors.textSecondary}>{sw ? "Msimbo umetumwa kwa" : "Reset code sent to"}{" "}<strong>{email ? maskEmail(email) : (sw ? "barua pepe yako" : "your email address")}</strong></Text>
                {!email ? <Text color={theme.colors.danger}>{sw ? "Kiungo hakina barua pepe. Omba msimbo mpya kupitia ukurasa wa kurejesha akaunti." : "This link is missing the email address. Request a new code from account recovery."}</Text> : null}
                <Stack spacing={theme.spacing.inline}>
                  <Text>{sw ? "Msimbo wa tarakimu 6" : "6-digit code"}</Text>
                  <OtpCodeInput value={code} onChange={setCode} disabled={busy || resending} label={sw ? "Msimbo wa kurejesha nenosiri" : "Password reset code"} />
                </Stack>
                <Stack spacing={theme.spacing.inline}>
                  <Text>{t("password")}</Text>
                  <Input type="password" name="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} fullWidth />
                </Stack>
                {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
                {notice ? <Text color={theme.colors.primary} role="status">{notice}</Text> : null}
                <Button type="submit" fullWidth loading={busy} disabled={!email || code.replace(/\D/g, "").length !== 6}>{busy ? t("loading") : (sw ? "Hifadhi nenosiri jipya" : "Save new password")}</Button>
                <Button type="button" variant="outline" fullWidth disabled={busy || resending || secondsLeft > 0 || !email} onClick={resendCode}>{resending ? t("loading") : secondsLeft > 0 ? (sw ? "Tuma tena baada ya " + secondsLeft + "s" : "Resend code in " + secondsLeft + "s") : (sw ? "Tuma msimbo mpya" : "Resend reset code")}</Button>
              </Stack>
            </form>
          )}
          <Text color={theme.colors.textSecondary}><Link href="/login" color={theme.colors.primary}>{sw ? "Rudi kuingia" : "Back to login"}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
