import { BaseManager } from "../foundation/managers";

import type {
  FeedbackManager,
} from "./Feedback.types";

export class SnackbarManager
  extends BaseManager
  implements FeedbackManager {}