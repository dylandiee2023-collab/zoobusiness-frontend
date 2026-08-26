import {
  useFormField,
} from "./hooks/useFormField";

export function FormHelperText() {
  const {
    helperText,
    error,
  } = useFormField();

  if (!helperText || error) {
    return null;
  }

  return (
    <small
      style={{
        display: "block",
        marginTop: 6,
        fontSize: 12,
        opacity: 0.7,
      }}
    >
      {helperText}
    </small>
  );
}