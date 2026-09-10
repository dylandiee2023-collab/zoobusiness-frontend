import type { PropsWithChildren } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { usePlatform } from "@/platform/providers/use-platform";

import { OnboardingGate } from "./onboarding-gate";

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
      <Navigate to="/dashboard" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const location = useLocation();

  if (!platform.authentication.ready) {
    return <RouteLoading />;
  }

  if (!platform.authentication.authenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <OnboardingGate>{children}</OnboardingGate>;
}
