import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.png";
import "./public-page.css";

type PublicPageConfig = {
  title: string;
  description: string;
  primary?: string;
};

const pages: Record<string, PublicPageConfig> = {
  "/platform": { title: "The retail operating platform", description: "ZooBusiness connects the core work behind modern retail operations in one business workspace." },
  "/features": { title: "Features built for retail", description: "Explore the operational foundation for products, inventory, branches, customers, orders, payments, teams and automation." },
  "/automation": { title: "Automation with AutoBots", description: "AutoBots is the automation layer behind ZooBusiness, designed to turn business events, rules and schedules into repeatable workflows." },
  "/integrations": { title: "Connect your business", description: "Bring your operational workflows together as ZooBusiness expands its integration surface across business channels and services." },
  "/pricing": { title: "Pricing", description: "Choose the ZooBusiness plan that fits your retail operation. Plan details will be published here as pricing is finalized." },
  "/resources": { title: "Resources", description: "Guides, documentation and practical resources for getting more from ZooBusiness." },
  "/about": { title: "About OTUS", description: "OTUS builds ZooBusiness as a retail operations platform focused on connected work and practical automation." },
  "/contact": { title: "Contact OTUS", description: "Have a question about ZooBusiness, partnerships or getting started? Contact the OTUS team." },
  "/terms": { title: "Terms of Service", description: "The terms governing use of ZooBusiness will be published here before production launch." },
  "/privacy": { title: "Privacy Policy", description: "The ZooBusiness privacy policy will be published here before production launch." },
  "/cookies": { title: "Cookie Policy", description: "Information about cookies and similar technologies used by ZooBusiness will be published here before production launch." },
  "/acceptable-use": { title: "Acceptable Use", description: "The acceptable-use requirements for ZooBusiness will be published here before production launch." },
};

export function PublicPage() {
  const { pathname } = useLocation();
  const config = pages[pathname] ?? pages["/platform"];

  return (
    <main className="zb-public-page">
      <header className="zb-public-nav">
        <Link to="/" aria-label="ZooBusiness home"><img src={logo} alt="ZooBusiness" /></Link>
        <nav aria-label="Public navigation">
          <Link to="/platform">Platform</Link>
          <Link to="/features">Features</Link>
          <Link to="/automation">Automation</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <div className="zb-public-actions">
          <Link to="/login">Sign In</Link>
          <Link className="zb-public-button" to="/register">Get Started</Link>
        </div>
      </header>

      <section className="zb-public-content">
        <span>ZooBusiness · OTUS</span>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
        <div className="zb-public-actions-content">
          <Link className="zb-public-button" to="/register">Get Started</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </section>

      <footer className="zb-public-footer">
        <div><strong>ZooBusiness</strong><span>A retail operations platform by OTUS.</span></div>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/contact">Contact</Link></div>
        <small>© {new Date().getFullYear()} OTUS. All rights reserved.</small>
      </footer>
    </main>
  );
}
