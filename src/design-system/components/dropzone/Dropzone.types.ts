import type {
  DragEvent,
  HTMLAttributes,
} from "react";

export interface DropzoneProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onDrop"
  > {
  accept?: string | undefined;

  multiple?: boolean | undefined;

  disabled?: boolean | undefined;

  onValueChange?: (
    files: File[],
  ) => void;

  onDragEnter?: (
    event: DragEvent<HTMLDivElement>,
  ) => void;

  onDragLeave?: (
    event: DragEvent<HTMLDivElement>,
  ) => void;

  onDragOver?: (
    event: DragEvent<HTMLDivElement>,
  ) => void;
}