import {
  useFormField,
} from "./hooks/useFormField";

export function FormError() {
  const {
    error,
  } = useFormField();

  if (!error) {
    return null;
  }

  return (
    <small
      role="alert"
      style={{
        display: "block",
        marginTop: 6,
        color: "#DC2626",
        fontSize: 12,
      }}
    >
      {error}
    </small>
  );
}