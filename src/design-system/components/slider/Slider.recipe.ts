export function sliderRecipe() {
  return {
    root:
      "flex w-full flex-col gap-3",

    header:
      "flex items-center justify-between",

    value:
      "text-sm font-medium text-gray-600",

    input: [
      "h-2",
      "w-full",
      "cursor-pointer",
      "appearance-none",
      "rounded-full",
      "bg-gray-200",
      "accent-blue-600",
    ].join(" "),

    disabled:
      "cursor-not-allowed opacity-50",
  };
}