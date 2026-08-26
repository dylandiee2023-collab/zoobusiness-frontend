import type {
  Permission,
  PermissionType,
} from "@/dashboard/foundation";

import {
  getPermission,
} from "@/dashboard/foundation";

export interface PermissionEngine {
  current: PermissionType;

  exists(): boolean;

  resolve(): Permission;

  is(
    permission: PermissionType,
  ): boolean;
}

export function createPermissionEngine(
  permission: PermissionType,
): PermissionEngine {
  return {
    current: permission,

    exists(): boolean {
      return !!getPermission(
        permission,
      );
    },

    resolve(): Permission {
      return getPermission(
        permission,
      );
    },

    is(
      target: PermissionType,
    ): boolean {
      return permission === target;
    },
  };
}