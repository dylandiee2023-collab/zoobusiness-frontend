export function tableRecipe(
  striped = true,
  hoverable = true,
) {
  return {
    table:
      "min-w-full border-collapse",

    head:
      "bg-gray-100",

    row: [
      striped
        ? "even:bg-gray-50"
        : "",
      hoverable
        ? "hover:bg-gray-100"
        : "",
    ].join(" "),

    cell:
      "border-b px-4 py-3 text-left",
  };
}