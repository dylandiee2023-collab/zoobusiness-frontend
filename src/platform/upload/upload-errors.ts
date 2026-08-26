export class UploadError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "UploadError";
  }
}

export class UploadFailedError
  extends UploadError
{
  constructor() {
    super("Upload failed.");
  }
}