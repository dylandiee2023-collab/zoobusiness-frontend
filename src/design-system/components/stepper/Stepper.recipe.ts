export function stepperRecipe() {
  return {
    root:
      "flex items-center w-full",

    step:
      "flex items-center flex-1",

    circle:
      "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold",

    active:
      "border-blue-600 bg-blue-600 text-white",

    completed:
      "border-green-600 bg-green-600 text-white",

    pending:
      "border-gray-300 bg-white text-gray-500",

    line:
      "mx-3 h-px flex-1 bg-gray-300",

    title:
      "mt-2 text-xs text-center",
  };
}