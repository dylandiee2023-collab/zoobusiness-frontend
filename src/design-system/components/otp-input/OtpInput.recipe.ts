export function otpInputRecipe() {
  return {
    root: "flex items-center gap-3",

    input: [
      "h-12",
      "w-12",
      "rounded-lg",
      "border",
      "border-gray-300",
      "bg-white",
      "text-center",
      "text-lg",
      "font-semibold",
      "outline-none",
      "transition-all",
      "focus:border-blue-600",
      "focus:ring-2",
      "focus:ring-blue-200",
    ].join(" "),

    disabled: "cursor-not-allowed opacity-50",
  };
}
