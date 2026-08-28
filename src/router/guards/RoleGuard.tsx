import type { ReactNode } from "react";

export interface RoleGuardProps {
  allowedRoles: string[];
  currentRole: string;
  fallback: ReactNode;
  children: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  currentRole,
  fallback,
  children,
}: RoleGuardProps) {
  return allowedRoles.includes(currentRole) ? <>{children}</> : <>{fallback}</>;
}
