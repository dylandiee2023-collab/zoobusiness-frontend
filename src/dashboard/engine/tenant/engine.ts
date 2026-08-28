import type { Tenant, TenantType } from "@/dashboard/foundation";

import { getTenant } from "@/dashboard/foundation";

export interface TenantEngine {
  current: TenantType;

  exists(): boolean;

  resolve(): Tenant;

  is(tenant: TenantType): boolean;
}

export function createTenantEngine(tenant: TenantType): TenantEngine {
  return {
    current: tenant,

    exists() {
      return !!getTenant(tenant);
    },

    resolve(): Tenant {
      return getTenant(tenant);
    },

    is(target: TenantType): boolean {
      return tenant === target;
    },
  };
}
