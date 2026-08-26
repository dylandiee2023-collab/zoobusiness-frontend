import { ROLES } from "./constants";

export type RoleType = keyof typeof ROLES;

export interface Role {
  id: RoleType;
  label: string;
}