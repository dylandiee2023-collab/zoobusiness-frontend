export function alertRecipe(
  variant:
    | "info"
    | "success"
    | "warning"
    | "danger" = "info",
): string {
  const variants = {
    info:
      "border-blue-200 bg-blue-50 text-blue-800",

    success:
      "border-green-200 bg-green-50 text-green-800",

    warning:
      "border-yellow-200 bg-yellow-50 text-yellow-800",

    danger:
      "border-red-200 bg-red-50 text-red-800",
  };

  return [
    "rounded-lg border p-4",
    variants[variant],
  ].join(" ");
}