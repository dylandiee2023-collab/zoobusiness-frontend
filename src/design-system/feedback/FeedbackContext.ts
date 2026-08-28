import { createContext } from "react";

import type { FeedbackController } from "./FeedbackController";

export const FeedbackContext = createContext<FeedbackController | null>(null);
