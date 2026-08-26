import {
  useFormField,
} from "./hooks/useFormField";

export function FormLabel() {
  const {
    id,
    label,
    required,
    disabled,
  } = useFormField();

  if (!label) {
    return null;
  }

  return (
    <label
      htmlFor={id}
      style={{
        display: "block",
        marginBottom: 6,
        fontWeight: 600,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}

      {required && (
        <span
          style={{
            color: "#DC2626",
            marginLeft: 4,
          }}
        >
          *
        </span>
      )}
    </label>
  );
}