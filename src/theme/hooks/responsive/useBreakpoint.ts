import {
  useEffect,
  useState,
} from "react";

import {
  breakpoints,
} from "@/theme/tokens/breakpoints";

import type {
  Breakpoint,
} from "@/theme/media";

const breakpointOrder: readonly Breakpoint[] = [
  "wide",
  "desktop",
  "laptop",
  "tablet",
  "mobileLg",
  "mobile",
];

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") {
    return "mobile";
  }

  const width = window.innerWidth;

  for (const breakpoint of breakpointOrder) {
    if (width >= breakpoints[breakpoint]) {
      return breakpoint;
    }
  }

  return "mobile";
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] =
    useState<Breakpoint>(
      getBreakpoint,
    );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(
        getBreakpoint(),
      );
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return breakpoint;
}