import { Button as DesignSystemButton } from "@/design-system/buttons";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <DesignSystemButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      {...props}
    />
  );
}
