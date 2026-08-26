export function dateRangePickerRecipe() {
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

    calendar:
      "space-y-4",

    divider:
      "border-t border-gray-200 my-2",
  };
}