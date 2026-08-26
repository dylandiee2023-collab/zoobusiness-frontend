import { BaseManager } from "../foundation/managers";

import type {
  FormManager,
} from "./Form.types";

export class ValidationManager
  extends BaseManager
  implements FormManager {}