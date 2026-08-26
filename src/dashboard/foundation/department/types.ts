import { DEPARTMENTS } from "./constants";

export type DepartmentType =
  keyof typeof DEPARTMENTS;

export interface Department {
  id: DepartmentType;
  label: string;
}