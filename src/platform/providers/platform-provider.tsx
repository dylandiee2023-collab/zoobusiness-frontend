import type {
  PropsWithChildren,
} from "react";

import {
  useMemo,
} from "react";

import {
  PlatformContext,
} from "./platform-context";

import {
  createPlatform,
} from "./create-platform";

export function PlatformProvider({
  children,
}: PropsWithChildren) {

  const platform =
    useMemo(
      () =>
        createPlatform(),
      [],
    );

  return (
    <PlatformContext.Provider
      value={platform}
    >
      {children}
    </PlatformContext.Provider>
  );
}