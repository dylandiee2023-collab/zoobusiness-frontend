export function modalRecipe(
  size: "sm" | "md" | "lg" | "xl" = "md",
): string {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return [
    "w-full rounded-xl bg-white shadow-xl",
    sizes[size],
  ].join(" ");
}