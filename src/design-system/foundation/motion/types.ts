export type MotionDuration =
  | "instant"
  | "fast"
  | "normal"
  | "slow";

export type MotionEasing =
  | "linear"
  | "ease"
  | "easeIn"
  | "easeOut"
  | "easeInOut";

export interface MotionOptions {
  duration?: MotionDuration;

  easing?: MotionEasing;

  property?: string;

  disabled?: boolean;
}