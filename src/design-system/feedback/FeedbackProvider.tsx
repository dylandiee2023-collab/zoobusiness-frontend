import {
  useState,
  type PropsWithChildren,
} from "react";

import {
  FeedbackContext,
} from "./FeedbackContext";

import {
  FeedbackController,
} from "./FeedbackController";

export function FeedbackProvider({
  children,
}: PropsWithChildren) {
  const [controller] = useState(
    () => new FeedbackController(),
  );

  return (
    <FeedbackContext.Provider
      value={controller}
    >
      {children}
    </FeedbackContext.Provider>
  );
}