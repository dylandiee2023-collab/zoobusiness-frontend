import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  Check,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import "./homepage.css";

const capabilities = [
  {
    icon: Store,
    title: "Retail Operations",
    text: "Run products, sales, inventory, branches and everyday retail workflows from one connected platform.",
  },
  {
    icon: PackageCheck,
    title: "Inventory & Warehouses",
    text: "Keep stock, warehouses and branch operations visible as your business grows.",
  },
  {
    icon: Users,
    title: "Teams & Access",
    text: "Manage business users, roles and permissions with structured access across your workspace.",
  },
  {
    icon: Truck,
    title: "Orders & Fulfillment",
    text: "Keep order activity and operational workflows connected instead of scattered across tools.",
  },
  {
    icon: ShieldCheck,
    title: "Payments & Security",
    text: "Support payment workflows, protected access and an auditable operational foundation.",
  },
  {
    icon: Zap,
    title: "Automation",
    text: "Automate repeatable business actions with event-driven rules for orders, payments, messages, schedules and APIs.",
  },
];

const operatingAreas = [
  { icon: Building2, title: "Business Workspace", text: "Organize your company around a workspace that keeps core operations together." },
  { icon: Store, title: "Stores & Branches", text: "Support multiple business locations and keep activity organized by branch." },
  { icon: PackageCheck, title: "Stock Control", text: "Manage products, inventory and warehouse operations with one operational view." },
  { icon: BarChart3, title: "Business Insight", text: "Use connected operational data to understand performance and plan the next move." },
];

export function Homepage() {
  return (
    <main className="zb-homepage">
      <header className="zb-home-nav">
        <Link className="zb-brand" to="/" aria-label="ZooBusiness home">
          <img src={logo} alt="ZooBusiness" />
        </Link>

        <nav className="zb-nav-links" aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#operations">Operations</a>
          <a href="#automation">Automation</a>
          <a href="#businesses">For Businesses</a>
          <a href="#resources">Resources</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="zb-nav-actions">
          <Link className="zb-signin" to="/login">Sign In</Link>
          <Link className="zb-button zb-button-primary zb-button-small" to="/login">
            Get Started
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="zb-hero" id="platform">
        <div className="zb-hero-copy">
          <div className="zb-eyebrow">THE BUSINESS OPERATING PLATFORM</div>
          <h1>Run your business.<br /><span>Let the platform do more.</span></h1>
          <p>
            ZooBusiness gives retail businesses one connected foundation for products, inventory, branches, customers, orders, payments, teams and automation.
          </p>
          <div className="zb-hero-actions">
            <Link className="zb-button zb-button-primary" to="/login">
              Get Started
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="zb-button zb-button-secondary" href="#operations">Explore the platform</a>
          </div>
          <div className="zb-hero-proof">
            <Check size={17} aria-hidden="true" /> Built for growing retail businesses
          </div>
        </div>

        <div className="zb-hero-visual" aria-label="ZooBusiness retail operations and automation illustration">
          <div className="zb-orbit zb-orbit-one" />
          <div className="zb-orbit zb-orbit-two" />
          <div className="zb-hero-network-line zb-line-a" />
          <div className="zb-hero-network-line zb-line-b" />
          <div className="zb-hero-network-line zb-line-c" />
          <div className="zb-hero-node zb-node-factory"><Store size={23} /><span>Retail</span></div>
          <div className="zb-hero-node zb-node-supplier"><PackageCheck size={22} /><span>Inventory</span></div>
          <div className="zb-hero-node zb-node-wholesale"><Truck size={21} /><span>Orders</span></div>
          <div className="zb-hero-node zb-node-retail"><Users size={22} /><span>Team</span></div>
          <div className="zb-hero-core">
            <img src={logo} alt="" />
            <strong>ZooBusiness</strong>
            <span>Retail operating platform</span>
          </div>
          <div className="zb-floating-card zb-floating-stock"><span className="zb-dot" /> Automation active</div>
          <div className="zb-floating-card zb-floating-orders"><PackageCheck size={16} /><span>Inventory connected</span></div>
        </div>
      </section>

      <section className="zb-trust-strip" aria-label="ZooBusiness platform capabilities">
        <div className="zb-stat"><strong>1</strong><span>business platform</span></div>
        <div className="zb-stat"><strong>24/7</strong><span>digital operations</span></div>
        <div className="zb-stat"><strong>+</strong><span>automation-ready workflows</span></div>
        <p>One operational foundation for the way modern retail businesses manage, sell and grow.</p>
      </section>

      <section className="zb-section" id="operations">
        <div className="zb-section-heading">
          <div className="zb-eyebrow">BUILT FOR RETAIL OPERATIONS</div>
          <h2>Everything your business needs, connected.</h2>
          <p>ZooBusiness brings the day-to-day parts of your operation into one place, so your team can spend less time switching systems and more time running the business.</p>
        </div>
        <div className="zb-capability-grid">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article className="zb-capability-card" key={title}>
              <div className="zb-icon-box"><Icon size={21} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowRight size={17} className="zb-card-arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="zb-ecosystem-section" id="businesses">
        <div className="zb-section-heading zb-section-heading-light">
          <div className="zb-eyebrow">ONE BUSINESS FOUNDATION</div>
          <h2>Move from daily tasks to a connected way of working.</h2>
          <p>Built around the operational reality of retail businesses with branches, stock, teams, customers and constant activity.</p>
        </div>
        <div className="zb-ecosystem-grid">
          {operatingAreas.map(({ icon: Icon, title, text }, index) => (
            <div className="zb-ecosystem-card" key={title}>
              <div className="zb-ecosystem-step">0{index + 1}</div>
              <div className="zb-icon-box zb-icon-box-light"><Icon size={21} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="zb-flow" aria-label="Retail business operational flow">
          <span>Workspace</span><ArrowRight size={18} /><span>Branches</span><ArrowRight size={18} /><span>Inventory</span><ArrowRight size={18} /><span>Orders</span><ArrowRight size={18} /><span>Customers</span>
        </div>
      </section>

      <section className="zb-marketplace-section" id="automation">
        <div className="zb-marketplace-copy">
          <div className="zb-eyebrow">AUTOMATION ENGINE</div>
          <h2>Put repetitive work on autopilot.</h2>
          <p>
            ZooBusiness is designed to work with an automation backend that can react to business events such as orders, payments, messages, schedules, webhooks and APIs.
          </p>
          <Link className="zb-button zb-button-primary" to="/login">Start with ZooBusiness <ArrowRight size={18} /></Link>
        </div>
        <div className="zb-marketplace-visual">
          <div className="zb-market-panel">
            <span className="zb-market-label">AUTOMATION FLOW</span>
            <div className="zb-market-row"><span className="zb-product-pill"><PackageCheck size={16} /> Order event</span><strong>Trigger</strong><span>Ready</span></div>
            <div className="zb-market-row"><span className="zb-product-pill"><Zap size={16} /> Business rule</span><strong>Action</strong><span>Automatic</span></div>
            <div className="zb-market-row"><span className="zb-product-pill"><ShieldCheck size={16} /> Audit trail</span><strong>Control</strong><span>Tracked</span></div>
          </div>
        </div>
      </section>

      <section className="zb-ai-section" id="resources">
        <div className="zb-ai-visual">
          <div className="zb-ai-panel">
            <BrainCircuit size={28} />
            <span>SMARTER OPERATIONS</span>
            <strong>Connect activity today with better decisions tomorrow.</strong>
            <div className="zb-ai-bars"><i /><i /><i /><i /><i /></div>
            <small>Use connected business signals to improve planning, stock decisions and operational follow-through.</small>
          </div>
        </div>
        <div className="zb-ai-copy">
          <div className="zb-eyebrow">BUSINESS INTELLIGENCE</div>
          <h2>Know what is happening. Act with context.</h2>
          <p>As your operation grows, a connected system makes it easier to understand what is moving, where attention is needed and which workflows can be automated.</p>
          <div className="zb-check-list">
            <div><Check size={17} /> Understand operational activity from one platform</div>
            <div><Check size={17} /> Reduce repetitive manual work with automation</div>
            <div><Check size={17} /> Build decisions from connected business data</div>
          </div>
        </div>
      </section>

      <section className="zb-pricing-section" id="pricing">
        <div className="zb-pricing-copy">
          <div className="zb-eyebrow">READY FOR THE NEXT STAGE</div>
          <h2>Build a retail operation that can scale with you.</h2>
          <p>Start with the core platform your business needs today, then expand your operations as the business grows.</p>
        </div>
        <div className="zb-pricing-card">
          <span className="zb-pricing-label">GET STARTED</span>
          <strong>One connected foundation for retail.</strong>
          <div className="zb-pricing-line"><Check size={17} /> Products and inventory</div>
          <div className="zb-pricing-line"><Check size={17} /> Branches and teams</div>
          <div className="zb-pricing-line"><Check size={17} /> Orders, payments and automation</div>
          <Link className="zb-button zb-button-primary" to="/login">Get Started <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="zb-footer">
        <div className="zb-footer-brand">
          <img src={logo} alt="ZooBusiness" />
          <p>The operating platform for modern retail businesses.</p>
        </div>
        <div className="zb-footer-links">
          <a href="#platform">Platform</a>
          <a href="#operations">Operations</a>
          <a href="#automation">Automation</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login">Sign In</Link>
        </div>
      </footer>
    </main>
  );
}
