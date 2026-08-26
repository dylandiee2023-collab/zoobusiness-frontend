export interface DataGridPlugin {
  id: string;

  install(): void;

  uninstall?(): void;
}

export class PluginRegistry {
  private readonly plugins =
    new Map<
      string,
      DataGridPlugin
    >();

  register(
    plugin: DataGridPlugin,
  ): void {
    this.plugins.set(
      plugin.id,
      plugin,
    );

    plugin.install();
  }

  unregister(
    id: string,
  ): void {
    const plugin =
      this.plugins.get(id);

    plugin?.uninstall?.();

    this.plugins.delete(
      id,
    );
  }

  getAll(): DataGridPlugin[] {
    return [
      ...this.plugins.values(),
    ];
  }
}