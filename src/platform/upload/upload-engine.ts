import type {
  UploadFile,
} from "./upload-file";

export class UploadEngine {
  async upload(
    file: UploadFile,
  ): Promise<string> {

    void file;

    throw new Error(
      "Upload provider not configured.",
    );
  }
}