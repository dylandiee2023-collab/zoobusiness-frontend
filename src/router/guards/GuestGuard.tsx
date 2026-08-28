import type { ReactNode } from "react";

export interface GuestGuardProps {
  isGuest: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function GuestGuard({ isGuest, fallback, children }: GuestGuardProps) {
  return isGuest ? <>{children}</> : <>{fallback}</>;
}
