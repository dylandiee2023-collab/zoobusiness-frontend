import { BaseManager } from "../foundation/managers";

import type {
  FormManager,
} from "./Form.types";

export class SubmissionManager
  extends BaseManager
  implements FormManager {}