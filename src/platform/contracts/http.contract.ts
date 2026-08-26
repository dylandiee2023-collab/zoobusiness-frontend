export interface HttpRequest {
  url: string;

  method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE";

  headers?: Record<string, string>;

  body?: unknown;
}

export interface HttpResponse<T = unknown> {
  status: number;

  data: T;

  headers: Record<string, string>;
}

export interface HttpClientContract {
  request<T = unknown>(
    request: HttpRequest,
  ): Promise<HttpResponse<T>>;
}