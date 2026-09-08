import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.png";
import { useTheme } from "@/theme/hooks";

import "./public-page.css";

type PublicPageConfig = { title: string; description: string };

const pages: Record<string, PublicPageConfig> = {
  "/platform": { title: "The retail operating platform", description: "ZooBusiness connects the core work behind modern retail operations in one business workspace." },
  "/features": { title: "Features built for retail", description: "Explore the operational foundation for products, inventory, branches, customers, orders, payments, teams and automation." },
  "/automation": { title: "Automation with AutoBots", description: "AutoBots is the automation layer behind ZooBusiness, designed to turn business events, rules and schedules into repeatable workflows." },
  "/integrations": { title: "Connect your business", description: "Bring operational workflows together as ZooBusiness expands its integration surface across business channels and services." },
  "/pricing": { title: "Pricing", description: "Choose the ZooBusiness plan that fits your retail operation. Plan details will be published here as pricing is finalized." },
  "/resources": { title: "Resources", description: "Guides, documentation and practical resources for getting more from ZooBusiness." },
  "/about": { title: "About OTUS", description: "OTUS builds ZooBusiness as a retail operations platform focused on connected work and practical automation." },
  "/contact": { title: "Contact OTUS", description: "Have a question about ZooBusiness, partnerships or getting started? Contact the OTUS team." },
  "/terms": { title: "Terms of Service", description: "The terms governing use of ZooBusiness will be published here before production launch." },
  "/privacy": { title: "Privacy Policy", description: "The ZooBusiness privacy policy will be published here before production launch." },
  "/cookies": { title: "Cookie Policy", description: "Information about cookies and similar technologies used by ZooBusiness will be published here before production launch." },
  "/acceptable-use": { title: "Acceptable Use", description: "The acceptable-use requirements for ZooBusiness will be published here before production launch." },
};

const columns = [
  { title: "Platform", links: [["Platform", "/platform"], ["Operations", "/features"], ["Automation", "/automation"], ["Integrations", "/integrations"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["About OTUS", "/about"], ["Contact", "/contact"]] },
  { title: "Resources", links: [["Resources", "/resources"]] },
  { title: "Legal", links: [["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["Cookie Policy", "/cookies"], ["Acceptable Use", "/acceptable-use"]] },
  { title: "Account", links: [["Sign In", "/login"], ["Get Started", "/register"]] },
] as const;

export function PublicPage() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const colors = theme.colors;
  const config = pages[pathname] ?? pages["/platform"];

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
        <nav aria-label="Public navigation">
          <Link to="/platform">Platform</Link><Link to="/features">Features</Link><Link to="/automation">Automation</Link><Link to="/pricing">Pricing</Link>
        </nav>
        <div className="zb-public-actions"><Link to="/login">Sign In</Link><Link className="zb-public-button" to="/register">Get Started</Link></div>
      </header>

      <section className="zb-public-content">
        <span>ZooBusiness · OTUS</span><h1>{config.title}</h1><p>{config.description}</p>
        <div className="zb-public-actions-content"><Link className="zb-public-button" to="/register">Get Started</Link><Link to="/">Back to Home</Link></div>
      </section>

      <footer className="zb-public-footer">
        <div className="zb-public-footer-main">
          <div className="zb-public-footer-brand"><Link to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" /></Link><p>Retail operations, connected with automation.</p><strong>ZooBusiness — A retail operations platform by OTUS.</strong></div>
          <div className="zb-public-footer-columns">{columns.map((column) => <div key={column.title}><h2>{column.title}</h2>{column.links.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</div>)}</div>
        </div>
        <div className="zb-public-footer-bottom"><small>© {new Date().getFullYear()} OTUS. All rights reserved.</small><span>ZooBusiness is a product of OTUS.</span></div>
      </footer>
    </main>
  );
}
