export type IconSize =
  "navigation" | "toolbar" | "button" | "input" | "card" | "avatar";

export interface IconProps {
  size?: IconSize;

  color?: string;

  decorative?: boolean;

  title?: string;
}
