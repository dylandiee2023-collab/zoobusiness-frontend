import type { ReactNode } from "react";

export interface RouterProviderProps {
  children: ReactNode;
}

export function RouterProvider({
  children,
}: RouterProviderProps) {
  return <>{children}</>;
}