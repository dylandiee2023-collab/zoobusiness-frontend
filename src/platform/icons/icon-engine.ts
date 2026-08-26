import type {
  IconEngineContract,
} from "@/platform/contracts";

export class IconEngine
  implements IconEngineContract
{
  private readonly icons =
    new Map<
      string,
      unknown
    >();

  has(
    name: string,
  ): boolean {
    return this.icons.has(
      name,
    );
  }

  resolve(
    name: string,
  ): unknown {
    return this.icons.get(
      name,
    );
  }

  register(
    name: string,
    icon: unknown,
  ): void {
    this.icons.set(
      name,
      icon,
    );
  }
}