export function datePickerRecipe() {
  return {
    root:
      "relative w-full",

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

    popup:
      "absolute left-0 top-full z-50 mt-2",

    icon:
      "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500",
  };
}