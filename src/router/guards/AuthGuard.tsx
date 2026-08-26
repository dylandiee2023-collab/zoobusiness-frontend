import type { ReactNode } from "react";

export interface AuthGuardProps {
  isAuthenticated: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export function AuthGuard({
  isAuthenticated,
  fallback,
  children,
}: AuthGuardProps) {
  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
}