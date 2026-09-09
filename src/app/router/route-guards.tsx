import type { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers";

function RouteLoading() {
  return (
    <main
      aria-busy="true"
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "var(--zb-background, #ffffff)",
        color: "var(--zb-text, #0f172a)",
      }}
    >
      Loading ZooBusiness…
    </main>
  );
}

export function GuestRoute({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const location = useLocation();

  // Public/auth pages must remain renderable while a persisted session is
  // being hydrated. If the session proves authenticated, the redirect below
  // takes effect immediately after authentication notifies React.
  if (platform.authentication.authenticated) {
    return (
      <Navigate
        to="/business-setup"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const location = useLocation();
  const {
    workspace,
    loading,
    bootstrapping,
    bootstrapComplete,
    error,
  } = useWorkspace();

  if (!platform.authentication.ready || loading || bootstrapping) {
    return <RouteLoading />;
  }

  if (!platform.authentication.authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (workspace === null) {
    return (
      <main
        aria-live="polite"
        style={{
          minHeight: "100dvh",
          background: "var(--zb-background, #ffffff)",
          color: "var(--zb-text, #0f172a)",
          display: "grid",
          placeItems: "center",
          padding: "24px",
        }}
      >
        {error ?? "We could not load your workspace."}
      </main>
    );
  }

  const setupComplete = workspace.business_category_id != null;

  if (!setupComplete && location.pathname !== "/business-setup") {
    return (
      <Navigate
        to="/business-setup"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    setupComplete &&
    !bootstrapComplete &&
    location.pathname !== "/business-setup"
  ) {
    return (
      <Navigate
        to="/business-setup"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    setupComplete &&
    location.pathname === "/business-setup" &&
    bootstrapComplete
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
