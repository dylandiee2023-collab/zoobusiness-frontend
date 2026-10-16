import { useEffect, useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { OtpCodeInput } from "@/pages/auth/OtpCodeInput";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, resendVerification, saveAuthSession, verifyEmail } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { theme, mode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const email = params.get("email") ?? params.get("emailAddress") ?? "";
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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
    if (!email) { setError(sw ? "Barua pepe haipo kwenye kiungo hiki." : "Email address is missing from this link."); return; }
    if (!/^\d{6}$/.test(code)) { setError(sw ? "Weka msimbo wa tarakimu 6." : "Enter the 6-digit code."); return; }
    setBusy(true);
    try {
      const session = await verifyEmail(email.trim(), code, language);
      saveAuthSession(session);
      navigate("/business-setup", { replace: true });
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await resendVerification(email.trim(), language);
      setSecondsLeft(60);
      setCode("");
      setNotice(sw ? "Ikiwa akaunti inahitaji uthibitisho, msimbo mpya umetumwa." : "If the account needs verification, a new code has been sent.");
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally {
      setBusy(false);
    }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: "1px solid " + theme.colors.border, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "UTHIBITISHO WA BARUA PEPE" : "EMAIL VERIFICATION"}</Text>
            <Heading level={1}>{t("verifyTitle")}</Heading>
            <Text color={theme.colors.textSecondary}>{t("verifyInstructions")}</Text>
          </Stack>
          <form onSubmit={submit}>
            <Stack spacing={theme.spacing.form}>
              <Text color={theme.colors.textSecondary}>{sw ? "Msimbo wa uthibitisho umetumwa kwa" : "We sent a verification code to"}{" "}<strong>{email ? maskEmail(email) : (sw ? "barua pepe uliyotumia kujisajili" : "the email used during sign-up")}</strong></Text>
              {!email ? <Text color={theme.colors.danger} role="alert">{sw ? "Kiungo hiki hakina barua pepe. Rudi kwenye usajili uanze tena." : "The verification link is missing the email address. Return to sign-up and try again."}</Text> : null}
              <Stack spacing={theme.spacing.inline}>
                <Text>{t("verificationCode")}</Text>
                <OtpCodeInput value={code} onChange={setCode} disabled={busy} label={t("verificationCode")} />
              </Stack>
              {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
              {notice ? <Text color={theme.colors.primary}>{notice}</Text> : null}
              <Button type="submit" fullWidth loading={busy} disabled={!email}>{busy ? t("loading") : t("verifyButton")}</Button>
              <Button type="button" variant="outline" fullWidth disabled={busy || secondsLeft > 0 || !email} onClick={resend}>{busy ? t("loading") : secondsLeft > 0 ? (sw ? "Tuma tena baada ya " + secondsLeft + "s" : "Resend code in " + secondsLeft + "s") : t("resendCode")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}><Link href="/login" color={theme.colors.primary}>{sw ? "Rudi kuingia" : "Back to login"}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
