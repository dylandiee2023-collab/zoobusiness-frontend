export function dropzoneRecipe() {
  return {
    root: [
      "flex",
      "min-h-56",
      "w-full",
      "cursor-pointer",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded-xl",
      "border-2",
      "border-dashed",
      "border-gray-300",
      "bg-white",
      "transition-all",
      "hover:border-blue-600",
      "hover:bg-blue-50",
    ].join(" "),

    active:
      "border-blue-600 bg-blue-50",

    disabled:
      "pointer-events-none opacity-50",

    icon:
      "text-5xl",

    title:
      "mt-4 text-lg font-semibold",

    subtitle:
      "mt-2 text-sm text-gray-500",
  };
}