import type {
  HTMLAttributes,
} from "react";

export interface CommandItem {
  id: string;

  title: string;

  description?: string;

  shortcut?: string;

  disabled?: boolean;
}

export interface CommandPaletteProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  open: boolean;

  commands: CommandItem[];

  query?: string;

  placeholder?: string;

  onQueryChange?: (
    value: string,
  ) => void;

  onCommandSelect?: (
    id: string,
  ) => void;

  onClose?: () => void;
}