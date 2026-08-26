export function skeletonRecipe(
  rounded: "none" | "sm" | "md" | "lg" | "full" = "md",
  animated = true,
): string {
  const radius = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return [
    "bg-gray-200",
    animated ? "animate-pulse" : "",
    radius[rounded],
  ].join(" ");
}