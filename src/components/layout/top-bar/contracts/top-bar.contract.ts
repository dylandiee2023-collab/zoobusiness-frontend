import type {
  TopBarActions,
} from "./top-bar-actions";

import type {
  TopBarState,
} from "./top-bar-state";

export interface TopBarContract {
  readonly state: TopBarState;

  readonly actions: TopBarActions;
}