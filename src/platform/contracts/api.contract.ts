export interface ApiClientContract {
  get<T = unknown>(url: string): Promise<T>;

  post<T = unknown>(url: string, body?: unknown): Promise<T>;

  put<T = unknown>(url: string, body?: unknown): Promise<T>;

  patch<T = unknown>(url: string, body?: unknown): Promise<T>;

  delete<T = unknown>(url: string): Promise<T>;
}
