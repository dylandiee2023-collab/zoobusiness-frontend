export function badgeRecipe(
  variant: "primary" | "success" | "warning" | "danger" | "neutral" = "primary",
  size: "sm" | "md" | "lg" = "md",
): string {
  const variants = {
    primary: "bg-blue-100 text-blue-700",

    success: "bg-green-100 text-green-700",

    warning: "bg-yellow-100 text-yellow-700",

    danger: "bg-red-100 text-red-700",

    neutral: "bg-gray-100 text-gray-700",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",

    md: "px-3 py-1 text-sm",

    lg: "px-4 py-1.5 text-base",
  };

  return [
    "inline-flex items-center rounded-full font-medium",
    variants[variant],
    sizes[size],
  ].join(" ");
}
