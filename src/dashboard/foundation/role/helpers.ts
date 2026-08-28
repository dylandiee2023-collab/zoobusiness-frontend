import { ROLES } from "./constants";
import type { RoleType } from "./types";

export function getRole(role: RoleType) {
  return ROLES[role];
}

export function isOwner(role: RoleType): boolean {
  return role === "owner";
}

export function isAdministrator(role: RoleType): boolean {
  return role === "administrator";
}

export function isManager(role: RoleType): boolean {
  return role === "manager";
}

export function isSupervisor(role: RoleType): boolean {
  return role === "supervisor";
}

export function isEmployee(role: RoleType): boolean {
  return role === "employee";
}

export function isCashier(role: RoleType): boolean {
  return role === "cashier";
}
