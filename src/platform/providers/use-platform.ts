import {
  useContext,
} from "react";

import {
  PlatformContext,
} from "./platform-context";

export function usePlatform() {

  const platform =
    useContext(
      PlatformContext,
    );

  if (
    platform === null
  ) {
    throw new Error(
      "PlatformProvider is missing.",
    );
  }

  return platform;
}