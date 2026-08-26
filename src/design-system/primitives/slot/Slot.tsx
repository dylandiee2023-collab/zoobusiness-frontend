import { cloneElement } from "react";
import type { ReactElement } from "react";

import type { SlotProps } from "./Slot.types";

export function Slot({
  children,
  ...props
}: SlotProps) {
  return cloneElement(
    children as ReactElement,
    props,
  );
}