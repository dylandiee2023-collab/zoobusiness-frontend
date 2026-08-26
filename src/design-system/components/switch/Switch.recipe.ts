export function switchRecipe(
  size: "sm" | "md" | "lg" = "md",
): {
  track: string;
  thumb: string;
} {
  const sizes = {
    sm: {
      track: "h-5 w-9",
      thumb: "h-4 w-4 peer-checked:translate-x-4",
    },
    md: {
      track: "h-6 w-11",
      thumb: "h-5 w-5 peer-checked:translate-x-5",
    },
    lg: {
      track: "h-7 w-14",
      thumb: "h-6 w-6 peer-checked:translate-x-7",
    },
  };

  return {
    track: [
      "relative inline-flex rounded-full bg-gray-300 transition-colors peer-checked:bg-blue-600",
      sizes[size].track,
    ].join(" "),
    thumb: [
      "absolute left-0.5 top-0.5 rounded-full bg-white transition-transform",
      sizes[size].thumb,
    ].join(" "),
  };
}