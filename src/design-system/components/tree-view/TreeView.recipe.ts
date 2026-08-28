export function treeViewRecipe() {
  return {
    root: "flex flex-col gap-1",

    node: "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-blue-50",

    selected: "bg-blue-100 text-blue-700",

    disabled: "cursor-not-allowed opacity-50",

    children: "ml-6 mt-1 flex flex-col gap-1",

    arrow: "flex h-4 w-4 items-center justify-center text-xs",

    label: "flex-1",

    icon: "flex h-5 w-5 items-center justify-center",
  };
}
