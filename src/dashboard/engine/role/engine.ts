import type {
  Role,
  RoleType,
} from "@/dashboard/foundation";

import {
  getRole,
} from "@/dashboard/foundation";

export interface RoleEngine {
  current: RoleType;

  exists(): boolean;

  resolve(): Role;

  is(
    role: RoleType,
  ): boolean;
}

export function createRoleEngine(
  role: RoleType,
): RoleEngine {
  return {
    current: role,

    exists(): boolean {
      return !!getRole(role);
    },

    resolve(): Role {
      return getRole(role);
    },

    is(
      target: RoleType,
    ): boolean {
      return role === target;
    },
  };
}