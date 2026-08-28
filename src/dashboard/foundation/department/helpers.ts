import { DEPARTMENTS } from "./constants";
import type { DepartmentType } from "./types";

export function getDepartment(department: DepartmentType) {
  return DEPARTMENTS[department];
}

export function isFinanceDepartment(department: DepartmentType): boolean {
  return department === "finance";
}

export function isSalesDepartment(department: DepartmentType): boolean {
  return department === "sales";
}

export function isProcurementDepartment(department: DepartmentType): boolean {
  return department === "procurement";
}

export function isInventoryDepartment(department: DepartmentType): boolean {
  return department === "inventory";
}

export function isProductionDepartment(department: DepartmentType): boolean {
  return department === "production";
}

export function isHRDepartment(department: DepartmentType): boolean {
  return department === "hr";
}

export function isOperationsDepartment(department: DepartmentType): boolean {
  return department === "operations";
}

export function isKitchenDepartment(department: DepartmentType): boolean {
  return department === "kitchen";
}
