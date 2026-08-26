import { BaseManager } from "../foundation/managers";

import type {
  DataDisplayManager,
} from "./DataDisplay.types";

export class ListManager
  extends BaseManager
  implements DataDisplayManager {}