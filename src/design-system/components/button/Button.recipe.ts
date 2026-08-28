export function buttonRecipe(
  variant: "solid" | "outline" | "ghost" = "solid",
  size: "sm" | "md" | "lg" = "md",
): string {
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-blue-600 hover:bg-blue-50",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  return [
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    variants[variant],
    sizes[size],
  ].join(" ");
}
