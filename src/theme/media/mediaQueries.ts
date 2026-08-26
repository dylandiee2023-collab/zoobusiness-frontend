import { breakpoints } from "@/theme/tokens/breakpoints";

import { up } from "./helpers";
import type { Breakpoint } from "./types";

export const mediaQueries =
  Object.fromEntries(
    (
      Object.keys(
        breakpoints,
      ) as Breakpoint[]
    ).map((key) => [
      key,
      up(key),
    ]),
  );