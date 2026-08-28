import { PERMISSIONS } from "./constants";

export type PermissionType = keyof typeof PERMISSIONS;

export interface Permission {
  id: PermissionType;
  label: string;
}
