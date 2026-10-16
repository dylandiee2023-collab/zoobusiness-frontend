import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container, Flex, Heading, Input, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { authErrorMessage, AuthApiError, completeBusinessSetup, createWorkspace, getBusinessCategories, getCurrentWorkspace, type BusinessCategory, type Workspace } from "@/app/auth/auth-api";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";

export function BusinessSetupPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const sw = language === "sw";
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Tanzania");
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      if (!window.sessionStorage.getItem("zoobusiness.accessToken")) {
        navigate("/login", { replace: true });
        return;
      }
      try {
        const available = await getBusinessCategories(language);
        let current: Workspace | null = null;
        try {
          current = await getCurrentWorkspace(language);
        } catch (caught) {
          if (!(caught instanceof AuthApiError) || caught.status !== 404) throw caught;
        }
        if (!active) return;
        setCategories(available);
        setWorkspace(current);
        if (current?.name) setBusinessName(current.name);
        if (current?.business_category_id) setSetupComplete(true);
      } catch (caught) {
        if (active) setError(authErrorMessage(caught, language));
      } finally {
        if (active) setBusy(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [language, navigate]);

  const slug = useMemo(() => businessName.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100), [businessName]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setSaving(true);
    try {
      let current = workspace;
      if (!current) {
        if (slug.length < 2) throw new Error(sw ? "Jina la biashara lazima liwe na angalau herufi 2." : "Business name must contain at least 2 characters.");
        current = await createWorkspace(businessName.trim(), slug, language);
        setWorkspace(current);
      }
      const completedWorkspace = await completeBusinessSetup(current.id, {
        businessCategoryId: categoryId,
        ...(description.trim() ? { description: description.trim() } : {}),
        ...(address.trim() ? { address: address.trim() } : {}),
        ...(city.trim() ? { city: city.trim() } : {}),
        ...(region.trim() ? { region: region.trim() } : {}),
        ...(country.trim() ? { country: country.trim() } : {}),
      }, language);
      setSetupComplete(true);
    } catch (caught) {
      setError(authErrorMessage(caught, language));
    } finally { setSaving(false); }
  }

  return (
    <PublicShell>
      <Container maxWidth="42rem" padding={theme.spacing.page} center style={{ paddingBlock: theme.spacing.section }}>
        <Stack spacing={theme.spacing.section} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.card, background: theme.colors.surface, padding: theme.spacing.section, boxShadow: theme.shadows.card }}>
          <Stack spacing={theme.spacing.inline}>
            <Text color={theme.colors.primary} weight={700} transform="uppercase">{sw ? "HATUA YA MWISHO" : "ONE LAST STEP"}</Text>
            <Heading level={1}>{sw ? "Sanidi biashara yako" : "Set up your business"}</Heading>
            <Text color={theme.colors.textSecondary}>{sw ? "Taarifa hizi zitatumika kuanzisha workspace yako." : "Tell us a little about your business to configure your workspace."}</Text>
          </Stack>
          {setupComplete ? (
            <Stack spacing={theme.spacing.inline}>
              <Heading level={2}>{sw ? "Taarifa za biashara zimethibitishwa" : "Business setup is already complete"}</Heading>
              <Text color={theme.colors.textSecondary}>
                {sw ? "Taarifa hizi zimerudishwa kutoka kwenye workspace yako ya AutoBots:" : "These details were loaded from your saved AutoBots workspace:"}
              </Text>
              <Stack spacing={theme.spacing.inline} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.card }}>
                <Text weight={700}>{workspace?.name ?? "—"}</Text>
                <Text color={theme.colors.textSecondary}>
                  {categories.find((category) => category.id === workspace?.business_category_id)?.name ?? (sw ? "Aina ya biashara haijarudishwa" : "Business category not returned")}
                </Text>
              </Stack>
              <Text color={theme.colors.textSecondary}>
                {sw ? "Hakuna taarifa mpya zilizotumwa. Unaweza kurudi mwanzo; dashboard ya biashara itafunguliwa itakapounganishwa kwenye frontend." : "No new setup data was submitted. You can return home; the business dashboard will be available once its frontend route is connected."}
              </Text>
              <Button onClick={() => navigate("/", { replace: true })}>{sw ? "Rudi mwanzo" : "Back to home"}</Button>
            </Stack>
          ) : busy ? <Text color={theme.colors.textSecondary}>{t("loading")}</Text> : (
            <form onSubmit={submit}>
              <Stack spacing={theme.spacing.form}>
                <Stack spacing={theme.spacing.inline}><Text>{sw ? "Jina la biashara" : "Business name"}</Text><Input required minLength={2} maxLength={100} value={businessName} onChange={(event) => setBusinessName(event.target.value)} fullWidth /></Stack>
                <Stack spacing={theme.spacing.inline}>
                  <Text>{sw ? "Aina ya biashara" : "Business category"}</Text>
                  <select required value={categoryId} onChange={(event) => setCategoryId(event.target.value)} style={{ width: "100%", color: theme.colors.text, background: theme.colors.surface, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.input, padding: theme.spacing.inline }}>
                    <option value="">{sw ? "Chagua aina ya biashara" : "Select a category"}</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </select>
                </Stack>
                <Stack spacing={theme.spacing.inline}><Text>{sw ? "Maelezo (hiari)" : "Description (optional)"}</Text><Input value={description} onChange={(event) => setDescription(event.target.value)} fullWidth /></Stack>
                <Stack spacing={theme.spacing.inline}><Text>{sw ? "Anwani (hiari)" : "Address (optional)"}</Text><Input value={address} onChange={(event) => setAddress(event.target.value)} fullWidth /></Stack>
                <Flex gap={theme.spacing.inline} wrap="wrap">
                  <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 10rem" }}><Text>{sw ? "Jiji" : "City"}</Text><Input value={city} onChange={(event) => setCity(event.target.value)} fullWidth /></Stack>
                  <Stack spacing={theme.spacing.inline} style={{ flex: "1 1 10rem" }}><Text>{sw ? "Mkoa" : "Region"}</Text><Input value={region} onChange={(event) => setRegion(event.target.value)} fullWidth /></Stack>
                </Flex>
                <Stack spacing={theme.spacing.inline}><Text>{sw ? "Nchi" : "Country"}</Text><Input required value={country} onChange={(event) => setCountry(event.target.value)} fullWidth /></Stack>
                {error ? <Text color={theme.colors.danger} role="alert">{error}</Text> : null}
                <Button type="submit" fullWidth loading={saving}>{saving ? t("loading") : (sw ? "Kamilisha usanidi" : "Complete setup")}</Button>
              </Stack>
            </form>
          )}
        </Stack>
      </Container>
    </PublicShell>
  );
}
