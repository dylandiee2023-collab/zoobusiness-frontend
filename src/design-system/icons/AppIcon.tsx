import type { LucideProps } from "lucide-react";
import type { AppIconName } from "./app-icon-map";
import { APP_ICONS } from "./app-icon-map";

export type { AppIconName } from "./app-icon-map";

export interface AppIconProps extends Omit<LucideProps, "name"> {
  readonly name: AppIconName;
}

export function AppIcon({ name, size, strokeWidth, ...props }: AppIconProps) {
  const Icon = APP_ICONS[name];

  return <Icon size={size ?? 20} strokeWidth={strokeWidth ?? 1.9} {...props} />;
}
