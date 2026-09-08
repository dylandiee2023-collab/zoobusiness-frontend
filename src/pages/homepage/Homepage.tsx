import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ClipboardList,
  Mail,
  MessageCircle,
  Package,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import { useTheme } from "@/theme/hooks";

import "./homepage.css";
import "./autobots-section.css";
import "./homepage-responsive.css";

const operations = [
  {
    icon: Store,
    title: "Retail Operations",
    text: "Run your everyday retail work from one connected business foundation.",
  },
  {
    icon: Package,
    title: "Products & Stock",
    text: "Keep products, stock and warehouse activity visible as your business moves.",
  },
  {
    icon: Users,
    title: "Teams & Access",
    text: "Organize business users, roles and access without losing operational control.",
  },
  {
    icon: ClipboardList,
    title: "Orders & Fulfillment",
    text: "Keep order activity and fulfillment workflows connected to the rest of the business.",
  },
  {
    icon: ShieldCheck,
    title: "Payments & Security",
    text: "Build daily operations on a foundation designed for controlled access and auditable activity.",
  },
  {
    icon: Zap,
    title: "Automation",
    text: "Turn business events and rules into repeatable workflows with AutoBots at the core.",
  },
];

const channels = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    text: "Customer conversations can enter the automation flow.",
  },
  {
    icon: MessageCircle,
    name: "Instagram",
    text: "Route supported social conversations into business workflows.",
  },
  {
    icon: MessageCircle,
    name: "Messenger",
    text: "Connect customer messages to repeatable response rules.",
  },
  {
    icon: Mail,
    name: "Email",
    text: "Bring customer email workflows into the same automation model.",
  },
];

const foundations = [
  "Business workspace and branch structure",
  "Inventory and warehouse operations",
  "Customers, orders and payment activity",
  "Team roles, permissions and auditability",
];

export function HomePage() {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <main
      className="zb-homepage"
      style={
        {
          "--zb-background": colors.background,
          "--zb-surface": colors.surface,
          "--zb-text": colors.text,
          "--zb-muted": colors.textMuted,
          "--zb-primary": colors.primary,
          "--zb-border": colors.border,
          "--zb-info": colors.info,
          "--zb-success": colors.success,
        } as React.CSSProperties
      }
    >
      <header className="zb-home-nav">
        <Link className="zb-brand" to="/" aria-label="ZooBusiness home">
          <img src={logo} alt="ZooBusiness" />
        </Link>
        <nav className="zb-nav-links" aria-label="Primary navigation">
          <Link to="/platform">Platform</Link>
          <Link to="/features">Operations</Link>
          <Link to="/automation">Automation</Link>
          <Link to="/platform">For Businesses</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <div className="zb-nav-actions">
          <Link className="zb-signin" to="/login">
            Sign In
          </Link>
          <Link className="zb-button zb-button-primary zb-button-small" to="/register">
            Get Started <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="zb-hero" id="platform">
        <div className="zb-hero-copy">
          <div className="zb-eyebrow">THE RETAIL OPERATING PLATFORM</div>
          <h1>
            Run your business.
            <br />
            <span>Let the platform do more.</span>
          </h1>
          <p>
            ZooBusiness gives retail businesses one connected foundation for products, inventory,
            branches, customers, orders, payments, teams and automation.
          </p>
          <div className="zb-hero-actions">
            <Link className="zb-button zb-button-primary" to="/register">
              Get Started <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="zb-button zb-button-secondary" to="/features">
              Explore the platform
            </Link>
          </div>
          <div className="zb-hero-proof">
            <Check size={17} aria-hidden="true" /> Retail-first. Automation-ready.
          </div>
        </div>
        <div className="zb-hero-visual" aria-label="Retail operations and automation illustration">
          <div className="zb-orbit zb-orbit-one" />
          <div className="zb-orbit zb-orbit-two" />
          <div className="zb-hero-network-line zb-line-a" />
          <div className="zb-hero-network-line zb-line-b" />
          <div className="zb-hero-network-line zb-line-c" />
          <div className="zb-hero-node zb-node-retail">
            <Store size={22} aria-hidden="true" />
            <span>Retail</span>
          </div>
          <div className="zb-hero-node zb-node-inventory">
            <Package size={22} aria-hidden="true" />
            <span>Inventory</span>
          </div>
          <div className="zb-hero-node zb-node-orders">
            <ClipboardList size={21} aria-hidden="true" />
            <span>Orders</span>
          </div>
          <div className="zb-hero-node zb-node-team">
            <Users size={22} aria-hidden="true" />
            <span>Team</span>
          </div>
          <div className="zb-hero-core">
            <img src={logo} alt="" />
            <strong>ZooBusiness</strong>
            <span>Retail operating platform</span>
          </div>
          <div className="zb-floating-card zb-floating-automation">
            <Zap size={15} aria-hidden="true" /> Automation ready
          </div>
          <div className="zb-floating-card zb-floating-orders">
            <BarChart3 size={16} aria-hidden="true" /> Business activity connected
          </div>
        </div>
      </section>

      <section className="zb-trust-strip" aria-label="ZooBusiness platform capabilities">
        <div className="zb-stat">
          <strong>1</strong>
          <span>retail platform</span>
        </div>
        <div className="zb-stat">
          <strong>24/7</strong>
          <span>digital access</span>
        </div>
        <div className="zb-stat">
          <strong>+</strong>
          <span>automation-ready workflows</span>
        </div>
        <p>One connected foundation for retail operations today and smarter workflows tomorrow.</p>
      </section>

      <section className="zb-section" id="operations">
        <div className="zb-section-heading">
          <div className="zb-eyebrow">RETAIL OPERATIONS</div>
          <h2>Everything your retail business needs, connected.</h2>
          <p>Build daily operations around one platform instead of stitching together disconnected tools.</p>
        </div>
        <div className="zb-capability-grid">
          {operations.map(({ icon: Icon, title, text }) => (
            <article className="zb-capability-card" key={title}>
              <div className="zb-icon-box">
                <Icon size={21} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowRight size={17} className="zb-card-arrow" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="zb-ecosystem-section" id="businesses">
        <div className="zb-section-heading zb-section-heading-light">
          <div className="zb-eyebrow">BUILT FOR RETAIL BUSINESSES</div>
          <h2>One business workspace. One operating picture.</h2>
          <p>Manage the structure behind your retail business and keep the work your teams do connected.</p>
        </div>
        <div className="zb-ecosystem-grid">
          <div className="zb-ecosystem-card">
            <div className="zb-icon-box zb-icon-box-light">
              <Store size={21} aria-hidden="true" />
            </div>
            <h3>Business Workspace</h3>
            <p>Keep your retail organization and operational structure in one place.</p>
          </div>
          <div className="zb-ecosystem-card">
            <div className="zb-icon-box zb-icon-box-light">
              <Truck size={21} aria-hidden="true" />
            </div>
            <h3>Stores & Branches</h3>
            <p>Support branch-based operations with the right business structure around them.</p>
          </div>
          <div className="zb-ecosystem-card">
            <div className="zb-icon-box zb-icon-box-light">
              <Package size={21} aria-hidden="true" />
            </div>
            <h3>Stock Control</h3>
            <p>Connect products, inventory and warehouse activity so teams can act from one picture.</p>
          </div>
          <div className="zb-ecosystem-card">
            <div className="zb-icon-box zb-icon-box-light">
              <BarChart3 size={21} aria-hidden="true" />
            </div>
            <h3>Business Insight</h3>
            <p>Turn operational activity into clearer signals for planning and decisions.</p>
          </div>
        </div>
      </section>

      <section className="zb-marketplace-section" id="automation">
        <div className="zb-marketplace-copy">
          <div className="zb-eyebrow">AUTOMATION WITH AUTOBOTS</div>
          <h2>Customers message. AutoBots can move the workflow.</h2>
          <p>
            AutoBots sits behind ZooBusiness as the automation layer, turning supported customer events,
            business rules and schedules into repeatable workflows.
          </p>
          <div className="zb-check-list">
            <div>
              <Check size={17} aria-hidden="true" /> Respond to supported customer events
            </div>
            <div>
              <Check size={17} aria-hidden="true" /> Apply business rules consistently
            </div>
            <div>
              <Check size={17} aria-hidden="true" /> Keep activity auditable
            </div>
          </div>
        </div>
        <div className="zb-marketplace-visual">
          <div className="zb-market-panel">
            <span className="zb-market-label">AUTOBOTS FLOW</span>
            <div className="zb-market-row">
              <span className="zb-product-pill">
                <MessageCircle size={16} /> Customer message
              </span>
              <strong>Event</strong>
              <span>Received</span>
            </div>
            <div className="zb-market-row">
              <span className="zb-product-pill">
                <Zap size={16} /> AutoBots
              </span>
              <strong>Rule</strong>
              <span>Evaluated</span>
            </div>
            <div className="zb-market-row">
              <span className="zb-product-pill">
                <ArrowRight size={16} /> Response / action
              </span>
              <strong>Workflow</strong>
              <span>Executed</span>
            </div>
            <div className="zb-market-row">
              <span className="zb-product-pill">
                <ShieldCheck size={16} /> Audit trail
              </span>
              <strong>Activity</strong>
              <span>Recorded</span>
            </div>
          </div>
        </div>
      </section>

      <section className="zb-channels-section" aria-labelledby="zb-channels-title">
        <div className="zb-section-heading">
          <div className="zb-eyebrow">OMNICHANNEL CUSTOMER COMMUNICATION</div>
          <h2 id="zb-channels-title">Meet customers where they already talk to your business.</h2>
          <p>
            ZooBusiness is designed around an automation model that can connect customer conversations with the
            operational work behind the business.
          </p>
        </div>
        <div className="zb-channel-grid">
          {channels.map(({ icon: Icon, name, text }) => (
            <article className="zb-channel-card" key={name}>
              <div className="zb-icon-box">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="zb-ai-section" id="resources">
        <div className="zb-ai-visual">
          <div className="zb-ai-panel">
            <BrainCircuit size={28} aria-hidden="true" />
            <span>CONNECTED OPERATIONS</span>
            <strong>See the signals behind the work.</strong>
            <div className="zb-ai-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <small>Operational data, automation and insight working from the same foundation.</small>
          </div>
        </div>
        <div className="zb-ai-copy">
          <div className="zb-eyebrow">INTELLIGENT OPERATIONS</div>
          <h2>Know what is happening. See what comes next.</h2>
          <p>
            As your retail business grows, ZooBusiness gives your teams a connected operational picture that can
            support smarter planning, stock decisions and faster action.
          </p>
          <div className="zb-check-list">
            <div>
              <Check size={17} aria-hidden="true" /> Connect business activity in one place
            </div>
            <div>
              <Check size={17} aria-hidden="true" /> Build repeatable workflows with automation
            </div>
            <div>
              <Check size={17} aria-hidden="true" /> Create a stronger foundation for future insight
            </div>
          </div>
        </div>
      </section>

      <section className="zb-pricing-section" id="pricing">
        <div className="zb-pricing-copy">
          <div className="zb-eyebrow">READY WHEN YOU ARE</div>
          <h2>A retail platform designed to grow with the way you operate.</h2>
          <p>
            Start with the foundation your business needs today, then expand your workflows as your operations become
            more connected.
          </p>
        </div>
        <div className="zb-pricing-card">
          <span className="zb-pricing-label">GET STARTED</span>
          <strong>One platform. More of the work connected.</strong>
          {foundations.map((item) => (
            <div className="zb-pricing-line" key={item}>
              <Check size={17} aria-hidden="true" /> {item}
            </div>
          ))}
          <Link className="zb-button zb-button-primary" to="/pricing">
            View pricing <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="zb-footer">
        <div className="zb-footer-main">
          <div className="zb-footer-brand">
            <img src={logo} alt="ZooBusiness" />
            <p>Retail operations, connected with automation.</p>
            <strong>ZooBusiness — A retail operations platform by OTUS.</strong>
          </div>
          <div className="zb-footer-columns">
            <div className="zb-footer-column">
              <h2>Platform</h2>
              <Link to="/platform">Platform</Link>
              <Link to="/features">Operations</Link>
              <Link to="/automation">Automation</Link>
              <Link to="/integrations">Integrations</Link>
              <Link to="/pricing">Pricing</Link>
            </div>
            <div className="zb-footer-column">
              <h2>Company</h2>
              <Link to="/about">About OTUS</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="zb-footer-column">
              <h2>Resources</h2>
              <Link to="/resources">Resources</Link>
            </div>
            <div className="zb-footer-column">
              <h2>Legal</h2>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/cookies">Cookie Policy</Link>
              <Link to="/acceptable-use">Acceptable Use</Link>
            </div>
            <div className="zb-footer-column">
              <h2>Account</h2>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="zb-footer-bottom">
          <small>© {new Date().getFullYear()} OTUS. All rights reserved.</small>
          <span>ZooBusiness is a product of OTUS.</span>
        </div>
      </footer>
    </main>
  );
}
