import { useFormField } from "./hooks/useFormField";
import { useTheme } from "@/theme/hooks";

export function FormLabel() {
  const { id, label, disabled } = useFormField();
  const { theme } = useTheme();

  if (!label) {
    return null;
  }

  return (
    <label
      htmlFor={id}
      style={{
        display: "block",
        width: "100%",
        marginBottom: theme.spacing.icon,
        textAlign: "left",
        fontWeight: 600,
        color: theme.colors.text,
        opacity: disabled ? theme.opacity.disabled : 1,
        boxSizing: "border-box",
      }}
    >
      {label}
    </label>
  );
}
