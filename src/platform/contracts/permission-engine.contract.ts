export interface PermissionEngineContract {
  has(permission: string): boolean;

  hasAny(
    permissions: readonly string[],
  ): boolean;

  hasAll(
    permissions: readonly string[],
  ): boolean;

  getPermissions(): readonly string[];

  setPermissions(
    permissions: readonly string[],
  ): void;

  clear(): void;
}