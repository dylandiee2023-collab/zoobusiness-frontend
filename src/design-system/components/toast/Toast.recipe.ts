export function toastRecipe(
  variant: "info" | "success" | "warning" | "danger" = "info",
): string {
  const variants = {
    info: "border-blue-200 bg-white text-blue-700",

    success: "border-green-200 bg-white text-green-700",

    warning: "border-yellow-200 bg-white text-yellow-700",

    danger: "border-red-200 bg-white text-red-700",
  };

  return [
    "pointer-events-auto flex w-96 flex-col rounded-lg border shadow-xl",
    variants[variant],
  ].join(" ");
}
