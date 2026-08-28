import { useId } from "react";

import { FormProvider } from "./FormProvider";

import type { FormFieldProps } from "./Form.types";

export function FormField({
  id,
  name,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  readOnly = false,
  children,
}: FormFieldProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;

  return (
    <FormProvider
      value={{
        id: fieldId,
        name,
        label,
        helperText,
        error,
        required,
        disabled,
        readOnly,
        invalid: Boolean(error),
        state: error ? "error" : "default",
      }}
    >
      {children}
    </FormProvider>
  );
}
