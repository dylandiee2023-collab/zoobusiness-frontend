import type { ReactNode } from "react";

export interface PermissionGuardProps {
  requiredPermissions: string[];
  permissions: string[];
  fallback: ReactNode;
  children: ReactNode;
}

export function PermissionGuard({
  requiredPermissions,
  permissions,
  fallback,
  children,
}: PermissionGuardProps) {
  const allowed = requiredPermissions.every((permission) =>
    permissions.includes(permission),
  );

  return allowed
    ? <>{children}</>
    : <>{fallback}</>;
}