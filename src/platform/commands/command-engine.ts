import type {
  Command,
  CommandEngineContract,
} from "@/platform/contracts";

export class CommandEngine
  implements CommandEngineContract
{
  private readonly commands =
    new Map<
      string,
      Command
    >();

  register(
    command: Command,
  ): void {
    this.commands.set(
      command.id,
      command,
    );
  }

  async execute(
    id: string,
  ): Promise<void> {

    const command =
      this.commands.get(id);

    if (!command) {
      return;
    }

    await command.execute();
  }

  unregister(
    id: string,
  ): void {
    this.commands.delete(id);
  }

  clear(): void {
    this.commands.clear();
  }
}