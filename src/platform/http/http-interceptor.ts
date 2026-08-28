export interface HttpInterceptor {
  onRequest?(request: RequestInit): Promise<RequestInit> | RequestInit;

  onResponse?(response: Response): Promise<Response> | Response;
}
