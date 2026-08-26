import { BaseController } from "../foundation/controllers";
import { FeedbackRegistry } from "./FeedbackRegistry";

export class FeedbackController extends BaseController<FeedbackRegistry> {
  constructor() {
    super(new FeedbackRegistry());
  }
}