import type {
  LoggerContract,
} from "@/platform/contracts";

import { LoggerFormatter } from "./logger-formatter";

export class Logger
  implements LoggerContract
{
  private readonly formatter =
    new LoggerFormatter();

  debug(
    message: string,
    ...meta: unknown[]
  ): void {
    console.debug(
      this.formatter.format(
        "debug",
        message,
      ),
      ...meta,
    );
  }

  info(
    message: string,
    ...meta: unknown[]
  ): void {
    console.info(
      this.formatter.format(
        "info",
        message,
      ),
      ...meta,
    );
  }

  warn(
    message: string,
    ...meta: unknown[]
  ): void {
    console.warn(
      this.formatter.format(
        "warn",
        message,
      ),
      ...meta,
    );
  }

  error(
    message: string,
    ...meta: unknown[]
  ): void {
    console.error(
      this.formatter.format(
        "error",
        message,
      ),
      ...meta,
    );
  }
}