import type { Theme } from "@/theme/types";

type RadiusKey = keyof Theme["radius"];

export function getRadius(theme: Theme, radius: RadiusKey = "button") {
  return theme.radius[radius];
}
