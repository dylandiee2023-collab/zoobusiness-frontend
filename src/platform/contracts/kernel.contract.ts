import type {
  Disposable,
  Initializable,
  LifecycleState,
  Startable,
  Stoppable,
} from "@/platform/types";

export interface KernelContract
  extends Initializable,
    Startable,
    Stoppable,
    Disposable {

  readonly state: LifecycleState;

  readonly version: string;

  readonly initialized: boolean;

  readonly running: boolean;
}