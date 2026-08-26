import type {
  PermissionEngineContract,
} from "@/platform/contracts";

export class PermissionEngine
  implements PermissionEngineContract
{
  private permissions =
    new Set<string>();

  has(
    permission: string,
  ): boolean {
    return this.permissions.has(
      permission,
    );
  }

  hasAny(
    permissions: readonly string[],
  ): boolean {
    return permissions.some(
      (permission) =>
        this.permissions.has(
          permission,
        ),
    );
  }

  hasAll(
    permissions: readonly string[],
  ): boolean {
    return permissions.every(
      (permission) =>
        this.permissions.has(
          permission,
        ),
    );
  }

  getPermissions(): readonly string[] {
    return [
      ...this.permissions,
    ];
  }

  setPermissions(
    permissions: readonly string[],
  ): void {
    this.permissions =
      new Set(permissions);
  }

  clear(): void {
    this.permissions.clear();
  }
}