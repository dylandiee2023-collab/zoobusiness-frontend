export function timePickerRecipe() {
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

    popup: [
      "absolute",
      "left-0",
      "top-full",
      "z-50",
      "mt-2",
      "flex",
      "gap-2",
      "rounded-lg",
      "border",
      "border-gray-200",
      "bg-white",
      "p-4",
      "shadow-xl",
    ].join(" "),

    select: [
      "rounded-md",
      "border",
      "border-gray-300",
      "px-3",
      "py-2",
      "outline-none",
    ].join(" "),
  };
}
