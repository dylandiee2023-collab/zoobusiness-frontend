import { BaseManager } from "../foundation/managers";

import type {
  FeedbackManager,
} from "./Feedback.types";

export class NotificationManager
  extends BaseManager
  implements FeedbackManager {}