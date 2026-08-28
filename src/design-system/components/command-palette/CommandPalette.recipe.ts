export function commandPaletteRecipe() {
  return {
    overlay: "fixed inset-0 z-40 bg-black/40",

    root: [
      "fixed",
      "left-1/2",
      "top-24",
      "-translate-x-1/2",
      "z-50",
      "w-full",
      "max-w-2xl",
      "rounded-xl",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-2xl",
      "overflow-hidden",
    ].join(" "),

    input: "w-full border-b px-5 py-4 outline-none",

    list: "max-h-96 overflow-auto",

    item: "flex items-center justify-between px-5 py-3 hover:bg-blue-50 transition-colors",

    disabled: "opacity-50 cursor-not-allowed",

    title: "font-medium",

    description: "text-sm text-gray-500",

    shortcut: "text-xs rounded bg-gray-100 px-2 py-1",
  };
}
