import {
  motionDurations,
} from "./durations";

import {
  motionEasings,
} from "./easings";

import type {
  MotionOptions,
} from "./types";

export function createMotion(
  options: MotionOptions = {},
): string {
  if (options.disabled) {
    return "none";
  }

  const property =
    options.property ?? "all";

  const duration =
    motionDurations[
      options.duration ?? "fast"
    ];

  const easing =
    motionEasings[
      options.easing ?? "ease"
    ];

  return `${property} ${duration} ${easing}`;
}