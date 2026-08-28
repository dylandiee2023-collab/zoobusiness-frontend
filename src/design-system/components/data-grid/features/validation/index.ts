export interface ValidationResult {
  valid: boolean;

  message?: string | undefined;
}

export function required(value: unknown): ValidationResult {
  if (value === null || value === undefined || value === "") {
    return {
      valid: false,
      message: "Required field.",
    };
  }

  return {
    valid: true,
  };
}
