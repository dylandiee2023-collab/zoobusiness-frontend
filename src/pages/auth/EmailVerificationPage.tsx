import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
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
  const email = params.get("emailAddress") ?? params.get("email") ?? "";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const logo = mode === "dark" ? lightLogo : darkLogo;
  const sw = language === "sw";
  const code = digits.join("");

  useEffect(() => {
    if (email) inputs.current[0]?.focus();
  }, [email]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const intervalId = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearInterval(intervalId);
  }, [secondsLeft]);

  const header = (
    <Flex align="center" justify="space-between" gap={theme.spacing.inline} style={{ minHeight: theme.componentSizes.topbarHeight }}>
      <RouterLink to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" style={{ maxWidth: "9rem", maxHeight: "2.4rem", objectFit: "contain" }} /></RouterLink>
      <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")} style={{ color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
        <option value="en">EN</option><option value="sw">SW</option>
      </select>
    </Flex>
  );

  function setCodeAt(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setDigits((current) => current.map((item, position) => position === index ? digit : item));
    setError("");
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }

  function onDigitKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus();
  }

  function onCodePaste(event: ClipboardEvent<HTMLDivElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!pasted.length) return;
    event.preventDefault();
    setDigits(Array.from({ length: 6 }, (_, index) => pasted[index] ?? ""));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    if (!email.trim()) { setError(sw ? "Tafadhali rudi kwenye usajili uanze uthibitishaji tena." : "This verification link is missing the email address. Return to sign up and start verification again."); return; }
    if (!/^\d{6}$/.test(code)) { setError(sw ? "Weka msimbo wote wa tarakimu 6." : "Enter all 6 digits of the verification code."); inputs.current[digits.findIndex((digit) => !digit)]?.focus(); return; }
    setBusy(true);
    try {
      const session = await verifyEmail(email.trim(), code, language);
      saveAuthSession(session);
      navigate("/business-setup", { replace: true });
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally { setBusy(false); }
  }

  async function resend() {
    setError(""); setNotice("");
    if (!email.trim()) { setError(sw ? "Kiungo hakina barua pepe. Rudi kwenye usajili." : "This verification link is missing the email address. Return to sign up."); return; }
    setBusy(true);
    try {
      await resendVerification(email.trim(), language);
      setSecondsLeft(60);
      setDigits(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
      setNotice(sw ? "Ikiwa akaunti inahitaji uthibitisho, msimbo mpya umetumwa." : "If the account needs verification, a new code has been sent.");
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally { setBusy(false); }
  }

  return (
    <PublicShell header={header}>
      <Container maxWidth="34rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: "clamp(1.25rem, 4vw, 2.5rem)", boxShadow: theme.shadows.card, minWidth: 0 }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "UTHIBITISHO WA BARUA PEPE" : "EMAIL VERIFICATION"}</Text>
            <Heading level={1}>{t("verifyTitle")}</Heading>
            <Text color={theme.colors.textSecondary}>{email ? (sw ? `Msimbo wa uthibitisho umetumwa kwa ${email}` : `We sent a verification code to ${email}`) : (sw ? "Kiungo hiki hakina barua pepe ya akaunti." : "This verification link is missing the account email.")}</Text>
          </Stack>
          <form onSubmit={submit} noValidate>
            <Stack spacing={theme.spacing.form}>
              <Stack spacing={theme.spacing.inline}>
                <Text>{t("verificationCode")}</Text>
                <Flex gap="0.5rem" justify="space-between" onPaste={onCodePaste} style={{ minWidth: 0 }}>
                  {digits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => { inputs.current[index] = element; }}
                      aria-label={sw ? `Tarakimu ${index + 1}` : `Code digit ${index + 1}`}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      disabled={!email || busy}
                      onChange={(event) => setCodeAt(index, event.target.value)}
                      onKeyDown={(event) => onDigitKeyDown(index, event)}
                      style={{ width: "min(3.25rem, 15vw)", height: "3.5rem", minWidth: 0, textAlign: "center", fontSize: "1.4rem", fontWeight: 700, color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, outlineColor: theme.colors.primary }}
                    />
                  ))}
                </Flex>
              </Stack>
              {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
              {notice ? <Text color={theme.colors.primary} role="status">{notice}</Text> : null}
              <Button type="submit" fullWidth loading={busy} disabled={!email || busy || code.length !== 6}>{busy ? t("loading") : t("verifyButton")}</Button>
              <Button type="button" variant="outline" fullWidth disabled={busy || secondsLeft > 0 || !email} onClick={resend}>{busy ? t("loading") : secondsLeft > 0 ? (sw ? `Tuma tena baada ya ${secondsLeft}s` : `Resend code in ${secondsLeft}s`) : t("resendCode")}</Button>
            </Stack>
          </form>
          <Text color={theme.colors.textSecondary}><Link href="/signup" color={theme.colors.primary}>{sw ? "Anza usajili tena" : "Restart sign up"}</Link> · <Link href="/login" color={theme.colors.primary}>{sw ? "Rudi kuingia" : "Back to login"}</Link></Text>
        </Stack>
      </Container>
    </PublicShell>
  );
}
