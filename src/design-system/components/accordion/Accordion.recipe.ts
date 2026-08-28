export function accordionRecipe() {
  return {
    root: "rounded-lg border border-gray-200 overflow-hidden",

    item: "border-b last:border-b-0",

    trigger:
      "flex w-full items-center justify-between px-4 py-4 text-left font-medium hover:bg-gray-50 transition-colors",

    content: "px-4 pb-4 text-gray-700",

    disabled: "cursor-not-allowed opacity-50",
  };
}
