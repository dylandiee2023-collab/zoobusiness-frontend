import type { ReactNode } from "react";

export interface FeatureGuardProps {
  enabled: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function FeatureGuard({
  enabled,
  fallback,
  children,
}: FeatureGuardProps) {
  return enabled ? <>{children}</> : <>{fallback}</>;
}
