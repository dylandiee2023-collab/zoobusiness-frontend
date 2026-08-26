import type { LogLevel } from "./logger-level";

export class LoggerFormatter {
  format(
    level: LogLevel,
    message: string,
  ): string {
    return `[${level.toUpperCase()}] ${message}`;
  }
}