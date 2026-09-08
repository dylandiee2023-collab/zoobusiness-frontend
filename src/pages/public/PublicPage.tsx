import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.png";
import { useTheme } from "@/theme/hooks";
import { useLanguage } from "@/app/language";

import "./public-page.css";

type PublicPageConfig = { en: { title: string; description: string }; sw: { title: string; description: string } };

type LinkItem = readonly [string, string];

const pages: Record<string, PublicPageConfig> = {
  "/platform": { en: { title: "The retail operating platform", description: "ZooBusiness connects the core work behind modern retail operations in one business workspace." }, sw: { title: "Jukwaa la uendeshaji wa biashara ya rejareja", description: "ZooBusiness inaunganisha kazi kuu za uendeshaji wa biashara ya rejareja katika workspace moja ya biashara." } },
  "/features": { en: { title: "Features built for retail", description: "Explore the operational foundation for products, inventory, branches, customers, orders, payments, teams and automation." }, sw: { title: "Vipengele vilivyojengwa kwa biashara ya rejareja", description: "Gundua msingi wa uendeshaji wa bidhaa, stock, matawi, wateja, oda, malipo, timu na automation." } },
  "/automation": { en: { title: "Automation with AutoBots", description: "AutoBots is the automation layer behind ZooBusiness, designed to turn business events, rules and schedules into repeatable workflows." }, sw: { title: "Automation kupitia AutoBots", description: "AutoBots ni layer ya automation nyuma ya ZooBusiness, iliyoundwa kubadilisha matukio, sheria na ratiba za biashara kuwa workflows zinazorudiwa." } },
  "/integrations": { en: { title: "Connect your business", description: "Bring operational workflows together as ZooBusiness expands its integration surface across business channels and services." }, sw: { title: "Unganisha biashara yako", description: "Unganisha workflows za uendeshaji kadri ZooBusiness inavyopanua integrations kwenye channels na huduma za biashara." } },
  "/pricing": { en: { title: "Pricing", description: "Choose the ZooBusiness plan that fits your retail operation. Plan details will be published here as pricing is finalized." }, sw: { title: "Bei", description: "Chagua mpango wa ZooBusiness unaoendana na biashara yako ya rejareja. Maelezo ya mipango yatachapishwa hapa bei zitakapokamilishwa." } },
  "/resources": { en: { title: "Resources", description: "Guides, documentation and practical resources for getting more from ZooBusiness." }, sw: { title: "Rasilimali", description: "Miongozo, documentation na rasilimali za vitendo za kupata zaidi kutoka ZooBusiness." } },
  "/about": { en: { title: "About OTUS", description: "OTUS builds ZooBusiness as a retail operations platform focused on connected work and practical automation." }, sw: { title: "Kuhusu OTUS", description: "OTUS inajenga ZooBusiness kama jukwaa la uendeshaji wa rejareja linalolenga kazi zilizounganishwa na automation ya vitendo." } },
  "/contact": { en: { title: "Contact OTUS", description: "Have a question about ZooBusiness, partnerships or getting started? Contact the OTUS team." }, sw: { title: "Wasiliana na OTUS", description: "Una swali kuhusu ZooBusiness, partnerships au kuanza kutumia mfumo? Wasiliana na timu ya OTUS." } },
  "/terms": { en: { title: "Terms of Service", description: "The terms governing use of ZooBusiness will be published here before production launch." }, sw: { title: "Masharti ya Huduma", description: "Masharti yanayosimamia matumizi ya ZooBusiness yatachapishwa hapa kabla ya uzinduzi wa production." } },
  "/privacy": { en: { title: "Privacy Policy", description: "The ZooBusiness privacy policy will be published here before production launch." }, sw: { title: "Sera ya Faragha", description: "Sera ya faragha ya ZooBusiness itachapishwa hapa kabla ya uzinduzi wa production." } },
  "/cookies": { en: { title: "Cookie Policy", description: "Information about cookies and similar technologies used by ZooBusiness will be published here before production launch." }, sw: { title: "Sera ya Cookies", description: "Taarifa kuhusu cookies na teknolojia zinazofanana zinazotumiwa na ZooBusiness zitachapishwa hapa kabla ya uzinduzi wa production." } },
  "/acceptable-use": { en: { title: "Acceptable Use", description: "The acceptable-use requirements for ZooBusiness will be published here before production launch." }, sw: { title: "Matumizi Yanayokubalika", description: "Masharti ya matumizi yanayokubalika ya ZooBusiness yatachapishwa hapa kabla ya uzinduzi wa production." } },
};

const columns = (language: "en" | "sw") => {
  const en = [
    { title: "Platform", links: [["Platform", "/platform"], ["Operations", "/features"], ["Automation", "/automation"], ["Integrations", "/integrations"], ["Pricing", "/pricing"]] },
    { title: "Company", links: [["About OTUS", "/about"], ["Contact", "/contact"]] },
    { title: "Resources", links: [["Resources", "/resources"]] },
    { title: "Legal", links: [["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Cookie Policy", "/cookies"], ["Acceptable Use", "/acceptable-use"]] },
    { title: "Account", links: [["Sign In", "/login"], ["Get Started", "/register"]] },
  ];
  if (language === "en") return en;
  return [
    { title: "Jukwaa", links: [["Jukwaa", "/platform"], ["Uendeshaji", "/features"], ["Automation", "/automation"], ["Integrations", "/integrations"], ["Bei", "/pricing"]] },
    { title: "Kampuni", links: [["Kuhusu OTUS", "/about"], ["Wasiliana", "/contact"]] },
    { title: "Rasilimali", links: [["Rasilimali", "/resources"]] },
    { title: "Kisheria", links: [["Masharti ya Huduma", "/terms"], ["Sera ya Faragha", "/privacy"], ["Sera ya Cookies", "/cookies"], ["Matumizi Yanayokubalika", "/acceptable-use"]] },
    { title: "Akaunti", links: [["Ingia", "/login"], ["Anza", "/register"]] },
  ];
};

export function PublicPage() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const colors = theme.colors;
  const config = pages[pathname] ?? pages["/platform"];
  const copy = config[language];
  const links = columns(language) as { title: string; links: readonly LinkItem[] }[];

  return (
    <main className="zb-public-page" style={{
      "--zb-background": colors.background,
      "--zb-surface": colors.surface,
      "--zb-text": colors.text,
      "--zb-muted": colors.textMuted,
      "--zb-primary": colors.primary,
      "--zb-border": colors.border,
    } as React.CSSProperties}>
      <header className="zb-public-nav">
        <Link to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" /></Link>
        <nav aria-label="Public navigation"><Link to="/platform">{language === "sw" ? "Jukwaa" : "Platform"}</Link><Link to="/features">{language === "sw" ? "Vipengele" : "Features"}</Link><Link to="/automation">Automation</Link><Link to="/pricing">{language === "sw" ? "Bei" : "Pricing"}</Link></nav>
        <div className="zb-public-actions"><label className="zb-language-switch"><span>{language === "sw" ? "Lugha" : "Language"}</span><select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")}><option value="en">EN</option><option value="sw">SW</option></select></label><Link to="/login">{language === "sw" ? "Ingia" : "Sign In"}</Link><Link className="zb-public-button" to="/register">{language === "sw" ? "Anza" : "Get Started"}</Link></div>
      </header>

      <section className="zb-public-content">
        <span>ZooBusiness · OTUS</span><h1>{copy.title}</h1><p>{copy.description}</p>
        <div className="zb-public-actions-content"><Link className="zb-public-button" to="/register">{language === "sw" ? "Anza" : "Get Started"}</Link><Link to="/">{language === "sw" ? "Rudi Mwanzo" : "Back to Home"}</Link></div>
      </section>

      <footer className="zb-public-footer">
        <div className="zb-public-footer-main">
          <div className="zb-public-footer-brand"><Link to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" /></Link><p>{language === "sw" ? "Uendeshaji wa biashara ya rejareja, umeunganishwa na automation." : "Retail operations, connected with automation."}</p><strong>ZooBusiness — {language === "sw" ? "Jukwaa la uendeshaji wa rejareja la OTUS." : "A retail operations platform by OTUS."}</strong></div>
          <div className="zb-public-footer-columns">{links.map((column) => <div key={column.title}><h2>{column.title}</h2>{column.links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</div>)}</div>
        </div>
        <div className="zb-public-footer-bottom"><small>© {new Date().getFullYear()} OTUS. {language === "sw" ? "Haki zote zimehifadhiwa." : "All rights reserved."}</small><span>{language === "sw" ? "ZooBusiness ni bidhaa ya OTUS." : "ZooBusiness is a product of OTUS."}</span></div>
      </footer>
    </main>
  );
}
