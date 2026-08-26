import type {
  NavigationEngineContract,
} from "@/platform/contracts";

export class NavigationEngine
  implements NavigationEngineContract
{
  private readonly history: string[] =
    [];

  private index = -1;

  async navigate(
    path: string,
  ): Promise<void> {
    this.history.splice(
      this.index + 1,
    );

    this.history.push(path);

    this.index =
      this.history.length - 1;
  }

  back(): void {
    if (this.index > 0) {
      this.index--;
    }
  }

  forward(): void {
    if (
      this.index <
      this.history.length - 1
    ) {
      this.index++;
    }
  }

  async replace(
    path: string,
  ): Promise<void> {
    if (this.index < 0) {
      this.history.push(path);
      this.index = 0;

      return;
    }

    this.history[this.index] =
      path;
  }

  current(): string {
    return (
      this.history[this.index] ??
      "/"
    );
  }
}