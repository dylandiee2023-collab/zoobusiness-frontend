import { BaseManager } from "../foundation/managers";

import type {
  DataDisplayManager,
} from "./DataDisplay.types";

export class TableManager
  extends BaseManager
  implements DataDisplayManager {}