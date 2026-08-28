export function progressRecipe(
  size: "sm" | "md" | "lg" = "md",
  rounded = true,
  striped = false,
  animated = false,
) {
  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return {
    root: [
      "w-full overflow-hidden bg-gray-200",
      rounded ? "rounded-full" : "",
      sizes[size],
    ].join(" "),

    indicator: [
      "h-full bg-blue-600 transition-all duration-300",
      rounded ? "rounded-full" : "",
      striped
        ? "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
        : "",
      animated ? "animate-pulse" : "",
    ].join(" "),
  };
}
