export function menuRecipe() {
  return {
    root: [
      "min-w-56",
      "rounded-lg",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-lg",
      "overflow-hidden",
    ].join(" "),

    item: [
      "flex",
      "items-center",
      "gap-3",
      "w-full",
      "px-4",
      "py-3",
      "text-left",
      "transition-colors",
      "hover:bg-gray-100",
    ].join(" "),

    danger:
      "text-red-600",

    disabled:
      "cursor-not-allowed opacity-50",
  };
}