import { BaseManager } from "../foundation/managers";

import type { NavigationManager } from "./Navigation.types";

export class ActiveRouteManager
  extends BaseManager
  implements NavigationManager {}
