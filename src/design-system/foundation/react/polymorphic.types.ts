import type { ComponentPropsWithoutRef, ElementType } from "react";

export type AsProp<T extends ElementType> = {
  as?: T;
};

export type PolymorphicProps<
  T extends ElementType,
  Props extends object = Record<string, never>,
> = Props & AsProp<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props | "as">;
