export function getStickyStyle(side: "left" | "right", offset: number) {
  return {
    position: "sticky" as const,

    [side]: offset,

    zIndex: 20,

    background: "inherit",
  };
}
