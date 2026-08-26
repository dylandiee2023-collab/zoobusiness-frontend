export function spinnerRecipe(
  size: "sm" | "md" | "lg" | "xl" = "md",
  thickness: "thin" | "normal" | "thick" = "normal",
): string {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const borders = {
    thin: "border-2",
    normal: "border-[3px]",
    thick: "border-4",
  };

  return [
    "inline-block animate-spin rounded-full border-solid border-blue-600 border-t-transparent",
    sizes[size],
    borders[thickness],
  ].join(" ");
}