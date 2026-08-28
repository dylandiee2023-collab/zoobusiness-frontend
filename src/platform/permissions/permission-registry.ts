import type { PermissionPolicy } from "./permission-policy";

export class PermissionRegistry {
  private readonly policies = new Map<string, PermissionPolicy>();

  register(policy: PermissionPolicy): void {
    this.policies.set(policy.id, policy);
  }

  unregister(id: string): void {
    this.policies.delete(id);
  }

  has(id: string): boolean {
    return this.policies.has(id);
  }

  resolve(id: string): PermissionPolicy | undefined {
    return this.policies.get(id);
  }

  values(): readonly PermissionPolicy[] {
    return [...this.policies.values()];
  }

  clear(): void {
    this.policies.clear();
  }
}
