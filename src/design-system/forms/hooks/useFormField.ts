import { useContext } from "react";

import { FormContext } from "../FormContext";

export function useFormField() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormField must be used within FormProvider.");
  }

  return context;
}
