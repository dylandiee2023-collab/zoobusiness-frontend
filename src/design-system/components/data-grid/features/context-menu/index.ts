export interface RowMenuItem {
  id: string;

  label: string;

  danger?:
    | boolean
    | undefined;
}

export function createRowMenu(): RowMenuItem[] {
  return [
    {
      id: "view",
      label: "View",
    },
    {
      id: "edit",
      label: "Edit",
    },
    {
      id: "duplicate",
      label:
        "Duplicate",
    },
    {
      id: "delete",
      label: "Delete",
      danger: true,
    },
  ];
}