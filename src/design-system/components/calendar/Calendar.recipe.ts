export function calendarRecipe() {
  return {
    root: [
      "w-80",
      "rounded-xl",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-lg",
      "overflow-hidden",
    ].join(" "),

    header: "flex items-center justify-between border-b px-4 py-3",

    title: "font-semibold",

    grid: "grid grid-cols-7",

    weekday: "border-b py-2 text-center text-xs font-medium text-gray-500",

    day: "flex aspect-square items-center justify-center transition-colors hover:bg-blue-50",

    today: "bg-blue-600 text-white rounded-md",

    selected: "bg-blue-100 text-blue-700 rounded-md",

    disabled: "cursor-not-allowed opacity-40",
  };
}
