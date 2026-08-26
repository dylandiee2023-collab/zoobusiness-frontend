import type {
  UploadContract,
} from "@/platform/contracts";

export class Upload
  implements UploadContract
{
  async upload<T = unknown>(
    file: File,
    options?: Record<
      string,
      unknown
    >,
  ): Promise<T> {

    void file;
    void options;

    throw new Error(
      "Upload provider not configured.",
    );
  }

  cancel(
    id: string,
  ): void {
    void id;

    // TODO:
    // AbortController
  }
}