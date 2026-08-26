export interface PermissionPolicy {
  readonly id: string;

  readonly resource: string;

  readonly actions: readonly string[];
}