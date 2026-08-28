export function comboboxRecipe() {
  return {
    root: "relative w-full",

    input: [
      "w-full",
      "rounded-lg",
      "border",
      "border-gray-300",
      "bg-white",
      "px-4",
      "py-2.5",
      "outline-none",
      "focus:border-blue-600",
      "focus:ring-2",
      "focus:ring-blue-200",
    ].join(" "),

    panel: [
      "absolute",
      "left-0",
      "right-0",
      "top-full",
      "z-50",
      "mt-2",
      "max-h-72",
      "overflow-auto",
      "rounded-lg",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-lg",
    ].join(" "),

    item: "cursor-pointer px-4 py-2 hover:bg-blue-50",

    selected: "bg-blue-600 text-white",

    disabled: "cursor-not-allowed opacity-50",
  };
}
