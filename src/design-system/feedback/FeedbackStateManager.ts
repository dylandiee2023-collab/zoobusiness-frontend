import { BaseManager } from "../foundation/managers";

import type { FeedbackManager } from "./Feedback.types";

export class FeedbackStateManager
  extends BaseManager
  implements FeedbackManager {}
