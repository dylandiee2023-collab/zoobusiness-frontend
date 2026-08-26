import { BaseManager } from "../foundation/managers";

import type {
  NavigationManager,
} from "./Navigation.types";

export class MenuManager
  extends BaseManager
  implements NavigationManager {}