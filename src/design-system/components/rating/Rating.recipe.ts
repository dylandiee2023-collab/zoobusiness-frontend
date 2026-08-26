export function ratingRecipe() {
  return {
    root:
      "flex items-center gap-1",

    button: [
      "flex",
      "items-center",
      "justify-center",
      "transition-transform",
      "hover:scale-110",
      "text-2xl",
      "outline-none",
    ].join(" "),

    active:
      "text-yellow-400",

    inactive:
      "text-gray-300",

    disabled:
      "cursor-not-allowed opacity-50",
  };
}