export class DownloadError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "DownloadError";
  }
}

export class DownloadFailedError
  extends DownloadError
{
  constructor() {
    super("Download failed.");
  }
}