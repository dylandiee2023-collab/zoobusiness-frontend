import type { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useWorkspace } from "@/workspace/providers";

export function OnboardingGate({ children }: PropsWithChildren) {
  const location = useLocation();
  const {
    workspace,
    loading,
    bootstrapping,
    bootstrapComplete,
    error,
  } = useWorkspace();

  if (loading || bootstrapping) {
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
