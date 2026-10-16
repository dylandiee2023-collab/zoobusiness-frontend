import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Heading, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { authErrorMessage, getCurrentWorkspace, getCurrentWorkspaceAccess, type Workspace, type WorkspaceAccess } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";

export function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const sw = language === "sw";
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [access, setAccess] = useState<WorkspaceAccess | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!window.sessionStorage.getItem("zoobusiness.accessToken")) {
        navigate("/login", { replace: true });
        return;
      }
      setBusy(true);
      setError("");
      try {
        const [currentWorkspace, currentAccess] = await Promise.all([
          getCurrentWorkspace(language),
          getCurrentWorkspaceAccess(language),
        ]);
        if (!active) return;
        setWorkspace(currentWorkspace);
        setAccess(currentAccess);
      } catch (caught) {
        if (active) setError(authErrorMessage(caught, language));
      } finally {
        if (active) setBusy(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [attempt, language, navigate]);

  return (
    <PublicShell>
      <Container maxWidth="54rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section, minWidth: 0 }}>
        <Stack spacing={theme.spacing.section} style={{ minWidth: 0, padding: "clamp(1.25rem, 4vw, 2.5rem)", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "WORKSPACE YA BIASHARA" : "BUSINESS WORKSPACE"}</Text>
            <Heading level={1}>{sw ? "Muhtasari wa biashara" : "Business overview"}</Heading>
            <Text color={theme.colors.textSecondary}>{sw ? "Taarifa hizi zinatoka kwenye workspace na ruhusa zilizohifadhiwa na AutoBots." : "This information is loaded from your saved AutoBots workspace and access permissions."}</Text>
          </Stack>
          {busy ? <Text color={theme.colors.textSecondary}>{sw ? "Inapakia taarifa za biashara..." : "Loading your workspace..."}</Text> : error ? (
            <Stack spacing={theme.spacing.inline}>
              <Text color={theme.colors.danger} role="alert">{error}</Text>
              <Button variant="outline" onClick={() => setAttempt((value) => value + 1)}>{sw ? "Jaribu tena" : "Try again"}</Button>
            </Stack>
          ) : workspace && access ? (
            <Stack spacing={theme.spacing.inline}>
              <Heading level={2}>{workspace.name}</Heading>
              <Text color={theme.colors.textSecondary}>{sw ? "Anwani ya workspace" : "Workspace slug"}: {workspace.slug}</Text>
              <Text>{sw ? "Jukumu lako" : "Your workspace role"}: <strong>{access.role}</strong></Text>
              <Text color={theme.colors.textSecondary}>{sw ? "Ruhusa zinazotolewa na seva" : "Permissions supplied by the server"}: {access.permissions.length}</Text>
              {access.permissions.length ? (
                <Stack spacing={theme.spacing.inline}>
                  <Heading level={3}>{sw ? "Ruhusa zako" : "Your permissions"}</Heading>
                  {access.permissions.map((permission) => <Text key={permission} color={theme.colors.textSecondary}>{permission}</Text>)}
                </Stack>
              ) : null}
            </Stack>
          ) : null}
          <Button variant="outline" onClick={() => navigate("/", { replace: true })}>{sw ? "Rudi mwanzo" : "Return to home"}</Button>
        </Stack>
      </Container>
    </PublicShell>
  );
}
