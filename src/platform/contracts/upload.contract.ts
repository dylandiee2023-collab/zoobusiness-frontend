export interface UploadContract {
  upload<T = unknown>(
    file: File,
    options?: Record<string, unknown>,
  ): Promise<T>;

  cancel(id: string): void;
}