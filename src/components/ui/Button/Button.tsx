import type { ButtonProps } from "./Button.types";

const base = "inline-flex items-center justify-center gap-2 rounded-md border-0 font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";
const variants = {
  primary: "bg-[var(--zb-colors-primary)] text-[var(--zb-colors-onPrimary)] hover:opacity-90",
  secondary: "bg-[var(--zb-colors-surface)] text-[var(--zb-colors-text)] border border-[var(--zb-colors-border)] hover:bg-[var(--zb-colors-surfaceSecondary)]",
  ghost: "bg-transparent text-[var(--zb-colors-primary)] hover:bg-[var(--zb-colors-surfaceSecondary)]",
} as const;
const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3",
  lg: "px-5 py-4 text-base",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const classes = [base, variants[variant], sizes[size], fullWidth ? "w-full" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return <button className={classes} {...props} />;
}
