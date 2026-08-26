export function drawerRecipe(
  placement:
    | "left"
    | "right"
    | "top"
    | "bottom" = "right",
  size:
    | "sm"
    | "md"
    | "lg"
    | "xl" = "md",
) {
  const sizes = {
    sm: "w-72",
    md: "w-96",
    lg: "w-[32rem]",
    xl: "w-[40rem]",
  };

  const placementStyles = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full h-80",
    bottom: "bottom-0 left-0 w-full h-80",
  };

  return {
    overlay:
      "fixed inset-0 z-40 bg-black/40",

    panel: [
      "fixed",
      "z-50",
      "bg-white",
      "shadow-2xl",
      "flex",
      "flex-col",
      placement === "left" ||
      placement === "right"
        ? sizes[size]
        : "",
      placementStyles[
        placement
      ],
    ].join(" "),

    header:
      "flex items-center justify-between border-b px-6 py-4",

    body:
      "flex-1 overflow-auto p-6",
  };
}