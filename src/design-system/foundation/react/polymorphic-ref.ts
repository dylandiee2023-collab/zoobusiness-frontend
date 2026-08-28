import type { ComponentPropsWithRef, ElementType } from "react";

export type PolymorphicRef<T extends ElementType> =
  ComponentPropsWithRef<T>["ref"];
