export interface DownloadContract {
  download(
    url: string,
    filename?: string,
  ): Promise<void>;

  cancel(id: string): void;
}