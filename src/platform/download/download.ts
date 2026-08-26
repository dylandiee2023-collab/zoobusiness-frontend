import type {
  DownloadContract,
} from "@/platform/contracts";

export class Download
  implements DownloadContract
{
  async download(
    url: string,
    filename?: string,
  ): Promise<void> {

    const link =
      document.createElement("a");

    link.href = url;

    if (filename !== undefined) {
      link.download =
        filename;
    }

    document.body.appendChild(
      link,
    );

    link.click();

    document.body.removeChild(
      link,
    );
  }

  cancel(
    id: string,
  ): void {
    void id;

    // TODO:
    // AbortController implementation
  }
}