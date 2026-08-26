import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from "react";

export type PolymorphicComponent<
  DefaultElement extends ElementType,
  Props extends object = Record<string, never>,
> =
  ForwardRefExoticComponent<
    Props &
      ComponentPropsWithoutRef<DefaultElement> &
      RefAttributes<unknown>
  > & {
    <T extends ElementType = DefaultElement>(
      props: Props &
        Omit<ComponentPropsWithoutRef<T>, keyof Props> & {
          as?: T;
        },
    ): ReactElement | null;

    displayName?: string;
  };