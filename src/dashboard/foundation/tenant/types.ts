import { TENANTS } from "./constants";

export type TenantType = keyof typeof TENANTS;

export interface Tenant {
  id: TenantType;
  label: string;
}