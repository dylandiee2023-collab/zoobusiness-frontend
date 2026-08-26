export function textareaRecipe(
  size: "sm" | "md" | "lg" = "md",
  error = false,
): string {
  const sizes = {
    sm: "min-h-20 px-3 py-2 text-sm",

    md: "min-h-28 px-4 py-3 text-base",

    lg: "min-h-36 px-5 py-4 text-lg",
  };

  return [
    "w-full rounded-md border bg-white outline-none resize-y transition-colors",
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-blue-600",
    sizes[size],
  ].join(" ");
}