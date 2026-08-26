import { PERMISSIONS } from "./constants";
import type { PermissionType } from "./types";

export function getPermission(
  permission: PermissionType,
) {
  return PERMISSIONS[permission];
}

export function canView(
  permission: PermissionType,
): boolean {
  return permission === "view";
}

export function canCreate(
  permission: PermissionType,
): boolean {
  return permission === "create";
}

export function canUpdate(
  permission: PermissionType,
): boolean {
  return permission === "update";
}

export function canDelete(
  permission: PermissionType,
): boolean {
  return permission === "delete";
}

export function canApprove(
  permission: PermissionType,
): boolean {
  return permission === "approve";
}

export function canExport(
  permission: PermissionType,
): boolean {
  return permission === "export";
}