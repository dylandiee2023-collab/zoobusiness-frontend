import { BaseManager } from "../foundation/managers";

import type {
  NavigationManager,
} from "./Navigation.types";

export class RouterManager
  extends BaseManager
  implements NavigationManager {}