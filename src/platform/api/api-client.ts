import type { ApiClientContract } from "@/platform/contracts";

import {
  ApiError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "./api-errors";

import type { ApiConfig } from "./api-config";

import { defaultApiConfig } from "./api-config";

export class ApiClient implements ApiClientContract {
  private readonly config: ApiConfig;

  constructor(config: ApiConfig = defaultApiConfig) {
    this.config = config;
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>("GET", url);
  }

  async post<T>(
    url: string,
    body?: unknown,
  ): Promise<T> {
    return this.request<T>(
      "POST",
      url,
      body,
    );
  }

  async put<T>(
    url: string,
    body?: unknown,
  ): Promise<T> {
    return this.request<T>(
      "PUT",
      url,
      body,
    );
  }

  async patch<T>(
    url: string,
    body?: unknown,
  ): Promise<T> {
    return this.request<T>(
      "PATCH",
      url,
      body,
    );
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>("DELETE", url);
  }

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
  ): Promise<T> {
    const controller =
      new AbortController();

    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout,
    );

    try {
      const headers = {
        ...this.config.headers,
      };

      const request: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (body !== undefined) {
        request.body = JSON.stringify(body);
      }

      const response = await fetch(
        `${this.config.baseUrl}${url}`,
        request,
      );

      let data: unknown = null;

      const contentType =
        response.headers.get(
          "content-type",
        );

      if (
        contentType?.includes(
          "application/json",
        )
      ) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw this.createApiError(
          response.status,
          data,
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        throw new ApiError(
          "Request timed out",
        );
      }

      throw new ApiError(
        error instanceof Error
          ? error.message
          : "Network request failed",
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private createApiError(
    status: number,
    data: unknown,
  ): ApiError {
    if (status === 401) {
      return new UnauthorizedError();
    }

    if (status === 403) {
      return new ForbiddenError();
    }

    if (status === 404) {
      return new NotFoundError();
    }

    if (status >= 500) {
      return new InternalServerError();
    }

    const message =
      this.extractErrorMessage(data);

    return new ApiError(
      message,
      status,
    );
  }

  private extractErrorMessage(
    data: unknown,
  ): string {
    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data
    ) {
      const message =
        (data as {
          message?: unknown;
        }).message;

      if (typeof message === "string") {
        return message;
      }

      if (Array.isArray(message)) {
        return message
          .filter(
            (item): item is string =>
              typeof item === "string",
          )
          .join(", ");
      }
    }

    return "Request failed";
  }
}
