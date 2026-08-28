import type { HTMLAttributes, ReactNode } from "react";

export type TagVariant =
  "primary" | "secondary" | "success" | "warning" | "danger" | "info";

export type TagSize = "sm" | "md" | "lg";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;

  size?: TagSize;

  rounded?: boolean;

  children?: ReactNode;
}
