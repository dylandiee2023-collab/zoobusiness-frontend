export function inputRecipe(
  size: "sm" | "md" | "lg" = "md",
  error = false,
): string {
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
  };

  return [
    "w-full rounded-md border bg-white outline-none transition-colors",
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-300 focus:border-blue-600",
    sizes[size],
  ].join(" ");
}
