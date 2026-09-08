import { ArrowRight, Boxes, BrainCircuit, Building2, Check, Globe2, PackageCheck, Smartphone, Store, Truck, Users, X } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.png";
import "./homepage.css";

const ecosystem = [
  { icon: Building2, title: "Manufacturers", text: "Reach verified B2B buyers and move products through a connected supply network." },
  { icon: Boxes, title: "Suppliers", text: "Manage catalogues, stock and commercial relationships from one business platform." },
  { icon: PackageCheck, title: "Wholesalers", text: "Source products, manage inventory and keep wholesale operations moving." },
  { icon: Store, title: "Retailers", text: "Run stores, track stock and grow sales with connected business operations." },
];

const capabilities = [
  { icon: Store, title: "Business Operations", text: "Manage products, branches, inventory, orders and everyday workflows in one place." },
  { icon: Globe2, title: "B2B Marketplace", text: "Connect businesses across the supply chain and create new buying and selling opportunities." },
  { icon: Users, title: "Teams & Access", text: "Organize people, roles and business access as your company grows." },
  { icon: Truck, title: "Connected Commerce", text: "Keep products, movement and commercial activity connected from source to customer." },
  { icon: Smartphone, title: "Web + Mobile", text: "Give your teams a consistent business experience wherever work happens." },
  { icon: BrainCircuit, title: "Business Intelligence", text: "Turn operational data into clearer decisions, forecasts and smarter next steps." },
];

const stats = [
  { value: "1", label: "connected platform" },
  { value: "5", label: "business roles supported" },
  { value: "24/7", label: "digital access" },
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
          <a href="#solutions">Solutions</a>
          <a href="#marketplace">Marketplace</a>
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
          <div className="zb-eyebrow">THE BUSINESS OPERATING ECOSYSTEM</div>
          <h1>One Platform.<br /><span>Every Business.</span></h1>
          <p>
            ZooBusiness brings manufacturers, suppliers, wholesalers and retailers into one connected digital ecosystem for managing operations, moving products and growing business.
          </p>
          <div className="zb-hero-actions">
            <Link className="zb-button zb-button-primary" to="/login">
              Get Started
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="zb-button zb-button-secondary" href="#businesses">Explore ZooBusiness</a>
          </div>
          <div className="zb-hero-proof">
            <Check size={17} aria-hidden="true" /> Built for growing African businesses
          </div>
        </div>

        <div className="zb-hero-visual" aria-label="Connected business ecosystem illustration">
          <div className="zb-orbit zb-orbit-one" />
          <div className="zb-orbit zb-orbit-two" />
          <div className="zb-hero-network-line zb-line-a" />
          <div className="zb-hero-network-line zb-line-b" />
          <div className="zb-hero-network-line zb-line-c" />
          <div className="zb-hero-node zb-node-factory"><Building2 size={23} /><span>Factory</span></div>
          <div className="zb-hero-node zb-node-supplier"><Boxes size={22} /><span>Supplier</span></div>
          <div className="zb-hero-node zb-node-wholesale"><PackageCheck size={21} /><span>Wholesale</span></div>
          <div className="zb-hero-node zb-node-retail"><Store size={22} /><span>Retail</span></div>
          <div className="zb-hero-core">
            <img src={logo} alt="" />
            <strong>ZooBusiness</strong>
            <span>Connected commerce</span>
          </div>
          <div className="zb-floating-card zb-floating-stock"><span className="zb-dot" /> Inventory connected</div>
          <div className="zb-floating-card zb-floating-orders"><PackageCheck size={16} /><span>Orders moving</span></div>
        </div>
      </section>

      <section className="zb-trust-strip" aria-label="ZooBusiness platform capabilities">
        {stats.map((stat) => (
          <div key={stat.label} className="zb-stat">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
        <p>One connected foundation for the way modern businesses buy, sell and operate.</p>
      </section>

      <section className="zb-section" id="solutions">
        <div className="zb-section-heading">
          <div className="zb-eyebrow">BUILT AROUND YOUR BUSINESS</div>
          <h2>Everything your business needs, connected.</h2>
          <p>One place to run operations, connect the supply chain and create room for the next stage of growth.</p>
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
          <div className="zb-eyebrow">ONE BUSINESS NETWORK</div>
          <h2>From factory to customer, keep the whole chain connected.</h2>
          <p>ZooBusiness is designed around how products actually move through African commerce.</p>
        </div>
        <div className="zb-ecosystem-grid">
          {ecosystem.map(({ icon: Icon, title, text }, index) => (
            <div className="zb-ecosystem-card" key={title}>
              <div className="zb-ecosystem-step">0{index + 1}</div>
              <div className="zb-icon-box zb-icon-box-light"><Icon size={21} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="zb-flow" aria-label="Business flow from factory to customer">
          <span>Factory</span><ArrowRight size={18} /><span>Supplier</span><ArrowRight size={18} /><span>Wholesaler</span><ArrowRight size={18} /><span>Retailer</span><ArrowRight size={18} /><span>Customer</span>
        </div>
      </section>

      <section className="zb-marketplace-section" id="marketplace">
        <div className="zb-marketplace-copy">
          <div className="zb-eyebrow">B2B MARKETPLACE</div>
          <h2>Turn supply-chain connections into new business.</h2>
          <p>
            Discover products, connect with commercial partners and build stronger B2B relationships without leaving the ecosystem that runs your business.
          </p>
          <Link className="zb-button zb-button-primary" to="/login">Explore the platform <ArrowRight size={18} /></Link>
        </div>
        <div className="zb-marketplace-visual">
          <div className="zb-market-panel">
            <span className="zb-market-label">LIVE BUSINESS NETWORK</span>
            <div className="zb-market-row"><span className="zb-product-pill"><PackageCheck size={16} /> Fertilizer</span><strong>Wholesale</strong><span>Connected</span></div>
            <div className="zb-market-row"><span className="zb-product-pill"><Boxes size={16} /> Packaging</span><strong>Supplier</strong><span>Connected</span></div>
            <div className="zb-market-row"><span className="zb-product-pill"><Store size={16} /> Retail stock</span><strong>Retail</strong><span>Connected</span></div>
          </div>
        </div>
      </section>

      <section className="zb-ai-section" id="resources">
        <div className="zb-ai-visual">
          <div className="zb-ai-panel">
            <BrainCircuit size={28} />
            <span>BUSINESS INTELLIGENCE</span>
            <strong>Make the next decision with better signals.</strong>
            <div className="zb-ai-bars"><i /><i /><i /><i /><i /></div>
            <small>Forecasts, recommendations and operational insight.</small>
          </div>
        </div>
        <div className="zb-ai-copy">
          <div className="zb-eyebrow">INTELLIGENT OPERATIONS</div>
          <h2>Know what is happening. See what comes next.</h2>
          <p>As your business grows, ZooBusiness gives your teams a connected operational picture that can support smarter planning, stock decisions and commercial action.</p>
          <div className="zb-check-list">
            <div><Check size={17} /> Forecast demand and inventory needs</div>
            <div><Check size={17} /> Surface useful business recommendations</div>
            <div><Check size={17} /> Build decisions from connected operations</div>
          </div>
        </div>
      </section>

      <section className="zb-pricing-section" id="pricing">
        <div className="zb-pricing-copy">
          <div className="zb-eyebrow">READY WHEN YOU ARE</div>
          <h2>Build, manage and grow your business with ZooBusiness.</h2>
          <p>Start with the platform foundation you need today, then expand as your business evolves.</p>
        </div>
        <div className="zb-pricing-card">
          <span className="zb-pricing-label">GET STARTED</span>
          <strong>One platform for your next stage.</strong>
          <div className="zb-pricing-line"><Check size={17} /> Business-ready foundation</div>
          <div className="zb-pricing-line"><Check size={17} /> Connected ecosystem</div>
          <div className="zb-pricing-line"><Check size={17} /> Built to scale with you</div>
          <Link className="zb-button zb-button-primary" to="/login">Get Started <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="zb-footer">
        <div className="zb-footer-brand">
          <img src={logo} alt="ZooBusiness" />
          <p>The operating ecosystem for modern businesses.</p>
        </div>
        <div className="zb-footer-links">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login">Sign In</Link>
        </div>
      </footer>
    </main>
  );
}
