import { ORGANIZATION_TYPES } from "./constants";
import type { OrganizationType } from "./types";

export function getOrganizationType(type: OrganizationType) {
  return ORGANIZATION_TYPES[type];
}

export function isCompany(type: OrganizationType): boolean {
  return type === "company";
}

export function isBranch(type: OrganizationType): boolean {
  return type === "branch";
}

export function isDepartment(type: OrganizationType): boolean {
  return type === "department";
}
