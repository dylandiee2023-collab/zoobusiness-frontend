import type { ReactNode } from "react";

export interface SubscriptionGuardProps {
  active: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function SubscriptionGuard({
  active,
  fallback,
  children,
}: SubscriptionGuardProps) {
  return active
    ? <>{children}</>
    : <>{fallback}</>;
}