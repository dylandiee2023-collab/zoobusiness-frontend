import type { PropsWithChildren } from "react";

import { FormContext } from "./FormContext";

import type { FormFieldContextValue } from "./Form.types";

interface FormProviderProps extends PropsWithChildren {
  value: FormFieldContextValue;
}

export function FormProvider({ value, children }: FormProviderProps) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
