export function tooltipRecipe(
  placement:
    | "top"
    | "bottom"
    | "left"
    | "right" = "top",
) {
  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return {
    root: "relative inline-flex",

    tooltip: [
      "absolute",
      "z-50",
      "rounded-md",
      "bg-gray-900",
      "px-3",
      "py-2",
      "text-xs",
      "text-white",
      "shadow-lg",
      "whitespace-nowrap",
      positions[placement],
    ].join(" "),
  };
}