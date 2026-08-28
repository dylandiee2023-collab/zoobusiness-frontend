import type { Department, DepartmentType } from "@/dashboard/foundation";

import { getDepartment } from "@/dashboard/foundation";

export interface DepartmentEngine {
  current: DepartmentType;

  exists(): boolean;

  resolve(): Department;

  is(department: DepartmentType): boolean;
}

export function createDepartmentEngine(
  department: DepartmentType,
): DepartmentEngine {
  return {
    current: department,

    exists(): boolean {
      return !!getDepartment(department);
    },

    resolve(): Department {
      return getDepartment(department);
    },

    is(target: DepartmentType): boolean {
      return department === target;
    },
  };
}
