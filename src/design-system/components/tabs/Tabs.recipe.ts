export function tabsRecipe() {
  return {
    root: "flex border-b border-gray-200",

    tab: [
      "px-4",
      "py-3",
      "text-sm",
      "font-medium",
      "transition-colors",
      "border-b-2",
      "border-transparent",
      "hover:text-blue-600",
    ].join(" "),

    active: "border-blue-600 text-blue-600",

    disabled: "cursor-not-allowed opacity-50",
  };
}
