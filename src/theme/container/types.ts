import type {
  Breakpoint,
} from "@/theme/media";

export interface ContainerSize {
  maxWidth: number;
  padding: number;
}

export type ContainerMap =
  Record<
    Breakpoint,
    ContainerSize
  >;

export interface ContainerOptions {
  fluid?: boolean;
  centered?: boolean;
}