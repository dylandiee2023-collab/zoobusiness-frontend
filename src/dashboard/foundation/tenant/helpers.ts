import { TENANTS } from "./constants";
import type { TenantType } from "./types";

export function getTenant(tenant: TenantType) {
  return TENANTS[tenant];
}

export function isFactory(tenant: TenantType): boolean {
  return tenant === "factory";
}

export function isSupplier(tenant: TenantType): boolean {
  return tenant === "supplier";
}

export function isWholesale(tenant: TenantType): boolean {
  return tenant === "wholesale";
}

export function isRetail(tenant: TenantType): boolean {
  return tenant === "retail";
}

export function isRestaurant(tenant: TenantType): boolean {
  return tenant === "restaurant";
}
