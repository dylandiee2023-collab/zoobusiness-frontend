import type {
  WidgetDefinition,
  WidgetEngineContract,
} from "@/platform/contracts";

export class WidgetEngine
  implements WidgetEngineContract
{
  private readonly widgets:
    WidgetDefinition[] = [];

  getWidgets():
    readonly WidgetDefinition[] {
    return this.widgets;
  }

  register(
    widget: WidgetDefinition,
  ): void {
    this.widgets.push(
      widget,
    );
  }

  unregister(
    id: string,
  ): void {
    const index =
      this.widgets.findIndex(
        (widget) =>
          widget.id === id,
      );

    if (index >= 0) {
      this.widgets.splice(
        index,
        1,
      );
    }
  }

  clear(): void {
    this.widgets.length = 0;
  }
}