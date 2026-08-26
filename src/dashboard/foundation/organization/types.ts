import { ORGANIZATION_TYPES } from "./constants";

export type OrganizationType =
  keyof typeof ORGANIZATION_TYPES;

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  parentId?: string;
}