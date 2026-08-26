export function popoverRecipe(
  placement:
    | "top"
    | "bottom"
    | "left"
    | "right" = "bottom",
) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return {
    root: "relative inline-flex",

    panel: [
      "absolute",
      "z-50",
      "min-w-64",
      "rounded-xl",
      "border",
      "border-gray-200",
      "bg-white",
      "shadow-xl",
      "p-4",
      positions[placement],
    ].join(" "),
  };
}