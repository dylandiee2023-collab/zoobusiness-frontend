export function cardRecipe(
  padding: "none" | "sm" | "md" | "lg" = "md",
  shadow: "none" | "sm" | "md" | "lg" = "sm",
  bordered = true,
): string {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return [
    "rounded-xl bg-white",
    bordered ? "border border-gray-200" : "",
    paddings[padding],
    shadows[shadow],
  ].join(" ");
}
