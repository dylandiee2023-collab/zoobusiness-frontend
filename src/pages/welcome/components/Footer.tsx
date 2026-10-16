import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { useTheme } from "@/theme/hooks";
import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";

function SocialIcon({ name }: { name: "linkedin" | "instagram" | "x" }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M6.5 8.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM5.1 9.5h2.8v9H5.1v-9Zm4.6 0h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.3v5h-2.8v-4.4c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.5H9.7v-9Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.9" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3l-4.9-6.4L6.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z" />
    </svg>
  );
}

const socialLinks = [
  { name: "LinkedIn", icon: "linkedin" as const, href: "https://www.linkedin.com/" },
  { name: "Instagram", icon: "instagram" as const, href: "https://www.instagram.com/" },
  { name: "X", icon: "x" as const, href: "https://x.com/" },
];

export function Footer() {
  const navigate = useNavigate();
  const { theme, mode } = useTheme();
  const { language } = useLanguage();
  const sw = language === "sw";
  const logo = mode === "light" ? lightLogo : darkLogo;
  const muted = theme.colors.textSecondary;
  const border = theme.colors.border;

  const columnTitleStyle = { margin: 0, fontSize: theme.typography.body.fontSize, fontWeight: 700 } as const;
  const linkStyle = { color: muted, textDecoration: "none", lineHeight: 1.9 } as const;

  return (
    <footer
      aria-label={sw ? "Sehemu ya chini ya tovuti" : "Site footer"}
      style={{
        width: "100%",
        color: theme.colors.text,
        background: theme.colors.background,
        paddingBlock: "clamp(2.5rem, 6vw, 5rem) 1.5rem",
      }}
    >
      <Container maxWidth="80rem" padding={theme.spacing.page} center>
        <section
          aria-labelledby="footer-cta-title"
          style={{
            padding: "clamp(2rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)",
            borderRadius: theme.radius.card,
            background: mode === "dark" ? "#30383D" : "#E8F0EC",
            textAlign: "center",
            marginBottom: "clamp(3.5rem, 8vw, 6rem)",
          }}
        >
          <Stack spacing={theme.spacing.section} style={{ alignItems: "center", maxWidth: "48rem", marginInline: "auto" }}>
            <Heading
              id="footer-cta-title"
              level={2}
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.045em",
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              {sw ? "Uko tayari kukuza biashara yako?" : "Ready to grow your business with ZooBusiness?"}
            </Heading>
            <Text color={muted} style={{ lineHeight: 1.75, maxWidth: "42rem" }}>
              {sw
                ? "Simamia bidhaa, stock, mauzo na oda sehemu moja. Anza bure na boresha mpango wako wakati wowote."
                : "Manage products, inventory, sales and orders in one place. Start for free and upgrade anytime."}
            </Text>
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              rightIcon={<span aria-hidden="true">→</span>}
            >
              {sw ? "Anza bure" : "Get started free"}
            </Button>
          </Stack>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))",
            gap: "clamp(1.75rem, 4vw, 3.5rem)",
            paddingInline: "clamp(0rem, 1vw, 0.5rem)",
            paddingBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <Stack spacing={theme.spacing.inline} style={{ minWidth: 0 }}>
            <Link href="/" aria-label="ZooBusiness home" style={{ display: "inline-flex", width: "fit-content" }}>
              <img src={logo} alt="ZooBusiness" style={{ display: "block", width: "auto", maxWidth: "12rem", maxHeight: "2.5rem", objectFit: "contain" }} />
            </Link>
            <Text color={muted} style={{ lineHeight: 1.75, maxWidth: "20rem" }}>
              {sw
                ? "Jukwaa la kusimamia biashara na biashara za kidijitali kwa wasambazaji, wauzaji wa jumla na rejareja."
                : "Business management and commerce for suppliers, wholesalers and retailers."}
            </Text>
          </Stack>

          <Stack spacing={theme.spacing.inline}>
            <Heading level={3} style={columnTitleStyle}>{sw ? "Soko" : "Marketplace"}</Heading>
            <Link href="/marketplace" style={linkStyle}>{sw ? "Soko la bidhaa" : "Browse marketplace"}</Link>
            <Link href="/pricing" style={linkStyle}>{sw ? "Bei na mipango" : "Pricing"}</Link>
          </Stack>

          <Stack spacing={theme.spacing.inline}>
            <Heading level={3} style={columnTitleStyle}>{sw ? "Gundua" : "Explore"}</Heading>
            <Link href="/features" style={linkStyle}>{sw ? "Vipengele" : "Features"}</Link>
            <Link href="/academy" style={linkStyle}>{sw ? "Academy" : "Academy"}</Link>
          </Stack>

          <Stack spacing={theme.spacing.inline}>
            <Heading level={3} style={columnTitleStyle}>{sw ? "Wasiliana" : "Contact"}</Heading>
            <Text color={muted} style={{ lineHeight: 1.75 }}>Dar es Salaam, Tanzania</Text>
            <Link href="mailto:support@avatratech.com" style={linkStyle}>support@avatratech.com</Link>
          </Stack>
        </div>

        <div
          style={{
            borderTop: `1px solid ${border}`,
            paddingTop: "1.25rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem 1.5rem",
          }}
        >
          <Text color={muted} size={theme.typography.bodySmall.fontSize}>
            © {new Date().getFullYear()} AvatraTech Company Ltd. {sw ? "Haki zote zimehifadhiwa." : "All rights reserved."}
          </Text>

          <Flex align="center" gap={theme.spacing.inline} wrap="wrap">
            <Link href="/terms" style={linkStyle}>{sw ? "Masharti ya huduma" : "Terms of Service"}</Link>
            <Link href="/privacy" style={linkStyle}>{sw ? "Sera ya faragha" : "Privacy Policy"}</Link>
          </Flex>

          <Flex align="center" gap={theme.spacing.inline}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.75rem",
                  height: "2.75rem",
                  border: `1px solid ${border}`,
                  borderRadius: "50%",
                  color: theme.colors.text,
                  transition: "background-color 160ms ease, border-color 160ms ease",
                }}
              >
                <span style={{ display: "inline-flex", width: "1.25rem", height: "1.25rem" }}>
                  <SocialIcon name={social.icon} />
                </span>
              </a>
            ))}
          </Flex>
        </div>
      </Container>
    </footer>
  );
}
