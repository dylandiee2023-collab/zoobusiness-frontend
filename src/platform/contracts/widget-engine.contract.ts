export interface WidgetDefinition {
  id: string;

  component: unknown;

  permissions?: readonly string[];
}

export interface WidgetEngineContract {
  getWidgets(): readonly WidgetDefinition[];

  register(widget: WidgetDefinition): void;

  unregister(id: string): void;

  clear(): void;
}
