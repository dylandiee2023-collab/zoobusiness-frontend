export function contextMenuRecipe() {
  return {
    overlay:
      "fixed inset-0 z-40",

    menu: [
      "fixed",
      "z-50",
      "min-w-64",
      "overflow-hidden",
      "rounded-xl",
      "border",
      "border-gray-200",
      "bg-white",
      "py-2",
      "shadow-2xl",
    ].join(" "),

    item: [
      "flex",
      "items-center",
      "justify-between",
      "gap-4",
      "px-4",
      "py-2.5",
      "transition-colors",
      "hover:bg-blue-50",
    ].join(" "),

    left:
      "flex items-center gap-3",

    danger:
      "text-red-600",

    disabled:
      "cursor-not-allowed opacity-50",

    shortcut:
      "text-xs text-gray-500",
  };
}