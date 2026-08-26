import type {
  ApiClientContract,
} from "@/platform/contracts";

import type { ApiConfig } from "./api-config";

import { defaultApiConfig } from "./api-config";

export class ApiClient
  implements ApiClientContract
{
  private readonly config: ApiConfig;

  constructor(
    config: ApiConfig = defaultApiConfig,
  ) {
    this.config = config;
  }

  async get<T>(
    url: string,
  ): Promise<T> {
    return this.request<T>(
      "GET",
      url,
    );
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

  async delete<T>(
    url: string,
  ): Promise<T> {
    return this.request<T>(
      "DELETE",
      url,
    );
  }

private async request<T>(
  method: string,
  url: string,
  body?: unknown,
): Promise<T> {

  const request: RequestInit = {
    method,
    headers: this.config.headers,
  };

  if (body !== undefined) {
    request.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${this.config.baseUrl}${url}`,
    request,
  );

  return (await response.json()) as T;
}}