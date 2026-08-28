import type { ChangeEvent, HTMLAttributes } from "react";

export interface FileUploadProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  accept?: string | undefined;

  multiple?: boolean | undefined;

  disabled?: boolean | undefined;

  files?: FileList | null | undefined;

  onValueChange?: (
    files: FileList | null,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}
