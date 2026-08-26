import {
  createContext,
} from "react";

import type {
  FormFieldContextValue,
} from "./Form.types";

export const FormContext =
  createContext<FormFieldContextValue | null>(
    null,
  );