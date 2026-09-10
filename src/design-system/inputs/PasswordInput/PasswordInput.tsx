import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import { useTheme } from "@/theme/hooks";

import { Input } from "../Input";

import type { InputProps } from "../Input.types";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(function PasswordInput({ style, ...props }, ref) {
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: props.fullWidth ? "100%" : undefined,
      }}
    >
      <Input
        {...props}
        ref={ref}
        type={visible ? "text" : "password"}
        style={{
          ...style,
          paddingRight: `calc(${theme.spacing.input} + ${theme.iconSizes.input} + ${theme.spacing.icon})`,
        }}
      />

      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
        style={{
          position: "absolute",
          top: "50%",
          right: theme.spacing.input,
          transform: "translateY(-50%)",
          width: theme.iconSizes.input,
          height: theme.iconSizes.input,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          border: "none",
          background: "transparent",
          color: theme.colors.textSecondary,
          cursor: "pointer",
        }}
      >
        {visible ? (
          <EyeOff size={theme.iconSizes.input} aria-hidden="true" />
        ) : (
          <Eye size={theme.iconSizes.input} aria-hidden="true" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
