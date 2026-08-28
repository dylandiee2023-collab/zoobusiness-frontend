export function paginationRecipe() {
  return {
    root: "flex items-center justify-center gap-2",

    button: [
      "flex",
      "h-9",
      "w-9",
      "items-center",
      "justify-center",
      "rounded-md",
      "border",
      "border-gray-300",
      "bg-white",
      "transition-colors",
      "hover:bg-blue-50",
    ].join(" "),

    active: "border-blue-600 bg-blue-600 text-white",

    disabled: "cursor-not-allowed opacity-50",
  };
}
