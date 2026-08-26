import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement> {
  src?: string;

  alt?: string;

  name?: string;

  icon?: ReactNode;

  size?: AvatarSize;

  rounded?: boolean;
}