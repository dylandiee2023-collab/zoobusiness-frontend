import { logo } from "@/assets/brand";
import { AppIcon } from "@/design-system/icons";
import { PublicShell } from "@/shells/PublicShell";
import { useTheme } from "@/theme/hooks";

import "./welcome-page.css";

const features = [
  {
    icon: "package",
    title: "Product catalogue",
    description:
      "Keep product information organized so your team can find what it needs.",
  },
  {
    icon: "warehouse",
    title: "Inventory visibility",
    description:
      "Use the inventory tools to follow stock movements across your workspace.",
  },
  {
    icon: "receipt",
    title: "Orders and payments",
    description:
      "Bring order processing and payment workflows into the same operating space.",
  },
] as const;

const linkStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: "44px",
  padding: "0 18px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: 600,
  transition: "background-color 160ms ease, color 160ms ease",
} as const;

export function WelcomePage() {
  const { theme } = useTheme();

  const header = (
    <div
      className="welcome-header-inner"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.inline,
        minHeight: theme.componentSizes.topbarHeight,
      }}
    >
      <a
        href="#top"
        aria-label="ZooBusiness home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: theme.spacing.inline,
          color: theme.colors.text,
          textDecoration: "none",
          fontWeight: 750,
          whiteSpace: "nowrap",
        }}
      >
        <img
          src={logo}
          alt=""
          width={36}
          height={36}
          style={{ objectFit: "contain" }}
        />
        <span>ZooBusiness</span>
      </a>

      <nav
        className="welcome-nav"
        aria-label="Main navigation"
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.section,
        }}
      >
        <a href="#features" style={{ color: theme.colors.textSecondary }}>
          Features
        </a>
        <a href="#how-it-works" style={{ color: theme.colors.textSecondary }}>
          How it works
        </a>
      </nav>

      <a
        className="welcome-header-cta"
        href="#features"
        style={{
          ...linkStyle,
          minHeight: "40px",
          paddingInline: "14px",
          background: theme.colors.primary,
          color: theme.colors.onPrimary,
        }}
      >
        Explore platform
        <AppIcon name="chevronRight" size={16} aria-hidden="true" />
      </a>
    </div>
  );

  const footer = (
    <div
      className="welcome-footer-inner"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.inline,
        minHeight: theme.componentSizes.bottomNavigationHeight,
        color: theme.colors.textSecondary,
        fontSize: theme.typography.bodySmall.fontSize,
      }}
    >
      <span>© {new Date().getFullYear()} ZooBusiness</span>
      <a
        href="#top"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: theme.spacing.icon,
          color: theme.colors.textSecondary,
          textDecoration: "none",
        }}
      >
        Back to top
        <AppIcon name="chevronRight" size={16} aria-hidden="true" />
      </a>
    </div>
  );

  return (
    <PublicShell header={header} footer={footer}>
      <main
        id="top"
        style={{
          width: "100%",
          maxWidth: theme.containers.page,
          marginInline: "auto",
          padding: `${theme.spacing.section} ${theme.spacing.page}`,
          boxSizing: "border-box",
        }}
      >
        <section
          className="welcome-enter"
          aria-labelledby="welcome-title"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: theme.spacing.section,
            minHeight: "min(68dvh, 620px)",
            paddingBlock: theme.spacing.section,
          }}
        >
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: theme.spacing.icon,
              margin: 0,
              padding: "8px 12px",
              borderRadius: theme.radius.badge,
              background: theme.colors.surface,
              color: theme.colors.primary,
              fontSize: theme.typography.caption.fontSize,
              fontWeight: 700,
            }}
          >
            <AppIcon name="grid" size={16} aria-hidden="true" />
            Business operations, connected
          </p>

          <h1
            id="welcome-title"
            style={{
              ...theme.typography.display,
              maxWidth: "850px",
              margin: 0,
              fontSize: "clamp(2.5rem, 7vw, 5.25rem)",
              color: theme.colors.text,
            }}
          >
            Welcome to a clearer way to run your business.
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: 0,
              color: theme.colors.textSecondary,
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.75,
            }}
          >
            Bring your product catalogue, inventory, orders, and payments
            together in one workspace built to support your day-to-day work.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: theme.spacing.inline,
            }}
          >
            <a
              href="#features"
              style={{
                ...linkStyle,
                background: theme.colors.primary,
                color: theme.colors.onPrimary,
              }}
            >
              Explore features
              <AppIcon name="chevronRight" size={18} aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              style={{
                ...linkStyle,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text,
              }}
            >
              How it works
            </a>
          </div>
        </section>

        <section
          id="features"
          className="welcome-enter welcome-enter-delay-1"
          aria-labelledby="features-title"
          style={{
            paddingBlock: theme.spacing.section,
            scrollMarginTop: theme.componentSizes.topbarHeight,
          }}
        >
          <div style={{ marginBottom: theme.spacing.section }}>
            <p
              style={{
                margin: "0 0 8px",
                color: theme.colors.primary,
                fontSize: theme.typography.caption.fontSize,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Built for everyday operations
            </p>
            <h2
              id="features-title"
              style={{
                ...theme.typography.heading1,
                margin: 0,
                color: theme.colors.text,
              }}
            >
              The essentials, in one place.
            </h2>
          </div>

          <div
            className="welcome-feature-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
              gap: theme.spacing.card,
            }}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                className="welcome-feature-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: theme.spacing.inline,
                  padding: theme.spacing.section,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.card,
                  background: theme.colors.background,
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: theme.radius.card,
                    background: theme.colors.surface,
                    color: theme.colors.primary,
                  }}
                >
                  <AppIcon name={feature.icon} size={22} aria-hidden="true" />
                </span>
                <h3
                  style={{
                    ...theme.typography.heading3,
                    margin: 0,
                    color: theme.colors.text,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSecondary,
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="welcome-enter welcome-enter-delay-2"
          aria-labelledby="how-title"
          style={{
            paddingBlock: theme.spacing.section,
            scrollMarginTop: theme.componentSizes.topbarHeight,
          }}
        >
          <div
            style={{
              padding: theme.spacing.section,
              borderRadius: theme.radius.card,
              background: theme.colors.surface,
            }}
          >
            <h2
              id="how-title"
              style={{
                ...theme.typography.heading2,
                marginTop: 0,
                color: theme.colors.text,
              }}
            >
              A workspace that follows your workflow.
            </h2>
            <p
              style={{
                maxWidth: "720px",
                marginBottom: 0,
                color: theme.colors.textSecondary,
                lineHeight: 1.75,
              }}
            >
              Start with your workspace, then use the available tools for
              products, stock, orders, and payments. Each feature will connect
              to the AutoBots services that support it.
            </p>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
