import type {
  HttpClientContract,
  HttpRequest,
  HttpResponse,
} from "@/platform/contracts";

import {
  defaultHttpConfig,
  type HttpConfig,
} from "./http-config";

export class HttpClient
  implements HttpClientContract
{
  private readonly config: HttpConfig;

  constructor(
    config: HttpConfig = defaultHttpConfig,
  ) {
    this.config = config;
  }

  async request<T = unknown>(
  request: HttpRequest,
): Promise<HttpResponse<T>> {

  const init: RequestInit = {
    method: request.method,
    headers: {
      ...this.config.headers,
      ...request.headers,
    },
  };

  if (request.body !== undefined) {
    init.body = JSON.stringify(
      request.body,
    );
  }

  const response = await fetch(
    `${this.config.baseUrl}${request.url}`,
    init,
  );

  const data =
    (await response.json()) as T;

  return {
    status: response.status,
    data,
    headers: Object.fromEntries(
      response.headers.entries(),
    ),
  };
}}