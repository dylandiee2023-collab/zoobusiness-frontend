import type {
  Disposable,
  Initializable,
  Startable,
  Stoppable,
} from "@/platform/types";

import type {
  KernelContract,
} from "./kernel.contract";

export interface BootstrapContract
  extends Initializable,
    Startable,
    Stoppable,
    Disposable {

  readonly kernel: KernelContract;

  readonly bootstrapped: boolean;

  bootstrap(): Promise<void>;
}