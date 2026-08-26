export interface ColumnMenuItem {
  id: string;

  label: string;

  icon?: string;

  disabled?:
    | boolean
    | undefined;
}

export function createColumnMenu() {
  return [
    {
      id: "sort-asc",
      label:
        "Sort Ascending",
    },
    {
      id: "sort-desc",
      label:
        "Sort Descending",
    },
    {
      id: "hide",
      label:
        "Hide Column",
    },
    {
      id: "pin-left",
      label:
        "Pin Left",
    },
    {
      id: "pin-right",
      label:
        "Pin Right",
    },
  ] satisfies ColumnMenuItem[];
}