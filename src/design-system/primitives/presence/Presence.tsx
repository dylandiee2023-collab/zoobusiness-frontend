import type { PresenceProps } from "./Presence.types";

export function Presence({
  present = true,
  children,
}: PresenceProps) {
  if (!present) {
    return null;
  }

  return <>{children}</>;
}