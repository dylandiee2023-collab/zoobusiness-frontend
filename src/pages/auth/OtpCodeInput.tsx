import { useId, type ClipboardEvent, type KeyboardEvent } from "react";
import { useTheme } from "@/theme/hooks";

interface OtpCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label: string;
}

export function OtpCodeInput({ value, onChange, disabled = false, label }: OtpCodeInputProps) {
  const baseId = useId().replace(/:/g, "");
  const { theme } = useTheme();
  const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

  function focusDigit(index: number) {
    document.getElementById(baseId + "-" + index)?.focus();
  }

  function updateDigit(index: number, raw: string) {
    const incoming = raw.replace(/\D/g, "");
    if (!incoming) {
      if (index < value.length) onChange(value.slice(0, index) + value.slice(index + 1));
      return;
    }
    const start = Math.min(index, value.length);
    const next = value.slice(0, start) + incoming + value.slice(start + incoming.length);
    const result = next.slice(0, 6);
    onChange(result);
    focusDigit(Math.min(start + incoming.length, 5));
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    focusDigit(Math.min(pasted.length, 5));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      onChange(value.slice(0, -1));
      focusDigit(Math.min(value.length - 1, index - 1));
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusDigit(index - 1);
    } else if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      focusDigit(index + 1);
    }
  }

  return (
    <div role="group" aria-label={label} style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: "clamp(0.35rem, 2vw, 0.75rem)", width: "100%" }}>
      {digits.map((digit, index) => (
        <input
          key={index}
          id={baseId + "-" + index}
          aria-label={label + ", " + (index + 1) + " of 6"}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          pattern="[0-9]*"
          maxLength={6}
          required
          disabled={disabled}
          autoFocus={index === 0}
          value={digit}
          onChange={(event) => updateDigit(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          style={{ boxSizing: "border-box", width: "100%", minWidth: 0, height: "clamp(3.25rem, 12vw, 4rem)", textAlign: "center", fontSize: "clamp(1.25rem, 5vw, 1.75rem)", fontWeight: 700, color: theme.colors.text, background: theme.colors.surface, border: "1px solid " + theme.colors.border, borderRadius: theme.radius.input, outlineOffset: "2px" }}
        />
      ))}
    </div>
  );
}
