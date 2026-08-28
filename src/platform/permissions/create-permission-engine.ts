import { PermissionEngine } from "./permission-engine";

export function createPermissionEngine(): PermissionEngine {
  return new PermissionEngine();
}
