export function checkboxRecipe(size: "sm" | "md" | "lg" = "md"): string {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return [
    "rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500",
    sizes[size],
  ].join(" ");
}
