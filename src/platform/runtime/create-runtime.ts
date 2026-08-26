import type { BootstrapContract } from "@/platform/contracts";

import { Runtime } from "./runtime";

export function createRuntime(
  bootstrap: BootstrapContract,
): Runtime {
  return new Runtime(
    bootstrap,
  );
}