export function fileUploadRecipe() {
  return {
    root: [
      "relative",
      "w-full",
    ].join(" "),

    label: [
      "flex",
      "min-h-40",
      "cursor-pointer",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded-xl",
      "border-2",
      "border-dashed",
      "border-gray-300",
      "bg-white",
      "transition-colors",
      "hover:border-blue-600",
      "hover:bg-blue-50",
    ].join(" "),

    input:
      "hidden",

    title:
      "mt-3 text-base font-semibold",

    subtitle:
      "mt-1 text-sm text-gray-500",

    disabled:
      "pointer-events-none opacity-50",
  };
}