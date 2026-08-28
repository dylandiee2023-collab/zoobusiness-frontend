export interface ApiResponse<T = unknown> {
  status: number;

  data: T;

  headers: Headers;
}
