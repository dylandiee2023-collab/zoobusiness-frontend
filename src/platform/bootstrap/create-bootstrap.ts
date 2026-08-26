import type { KernelContract } from "@/platform/contracts";

import { Bootstrap } from "./bootstrap";

export function createBootstrap(
  kernel: KernelContract,
): Bootstrap {
  return new Bootstrap(kernel);
}