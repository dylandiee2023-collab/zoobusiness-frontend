export function scrollAreaRecipe() {
  return {
    root: "relative overflow-hidden rounded-xl",

    viewport: "h-full w-full",

    vertical: "overflow-y-auto overflow-x-hidden",

    horizontal: "overflow-x-auto overflow-y-hidden",

    both: "overflow-auto",

    hidden: "overflow-hidden",

    scrollbar: [
      "[scrollbar-width:thin]",
      "[scrollbar-color:#2563eb_transparent]",
    ].join(" "),
  };
}
