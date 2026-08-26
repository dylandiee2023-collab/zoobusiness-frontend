import type {
  Disposable,
  Initializable,
  LifecycleState,
  Startable,
  Stoppable,
} from "@/platform/types";

export interface RuntimeContract
  extends Initializable,
    Startable,
    Stoppable,
    Disposable {
  readonly state: LifecycleState;

  readonly ready: boolean;
}