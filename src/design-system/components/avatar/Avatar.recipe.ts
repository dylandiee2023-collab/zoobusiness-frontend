export function avatarRecipe(
  size: "sm" | "md" | "lg" | "xl" = "md",
): string {
  const sizes = {
    sm: "w-8 h-8 text-xs",

    md: "w-10 h-10 text-sm",

    lg: "w-14 h-14 text-base",

    xl: "w-20 h-20 text-xl",
  };

  return [
    "inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 text-white font-semibold select-none",
    sizes[size],
  ].join(" ");
}