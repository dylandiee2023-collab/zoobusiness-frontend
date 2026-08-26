import type {
  DownloadFile,
} from "./download-file";

export class DownloadEngine {
  async download(
    file: DownloadFile,
  ): Promise<void> {

    const link =
      document.createElement("a");

    link.href = file.url;
    link.download = file.filename;
    link.click();
  }
}