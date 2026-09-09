import type { PropsWithChildren } from "react";

import { useEffect } from "react";
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

  if (!platform.authentication.ready) {
    return <RouteLoading />;
  }

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
    refresh,
  } = useWorkspace();

  useEffect(() => {
    if (
      !platform.authentication.ready ||
      !platform.runtime.ready ||
      !platform.authentication.authenticated
    ) {
      return;
    }

    void refresh();
  }, [
    location.pathname,
    platform.authentication.ready,
    platform.runtime.ready,
    platform.authentication.authenticated,
    refresh,
  ]);

  if (
    !platform.authentication.ready ||
    !platform.runtime.ready ||
    loading ||
    bootstrapping
  ) {
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
