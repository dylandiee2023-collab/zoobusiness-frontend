import type { Widget, WidgetType } from "@/dashboard/foundation";

import { getWidget } from "@/dashboard/foundation";

export interface WidgetEngine {
  current: WidgetType;

  exists(): boolean;

  resolve(): Widget;

  is(widget: WidgetType): boolean;
}

export function createWidgetEngine(widget: WidgetType): WidgetEngine {
  return {
    current: widget,

    exists(): boolean {
      return !!getWidget(widget);
    },

    resolve(): Widget {
      return getWidget(widget);
    },

    is(target: WidgetType): boolean {
      return widget === target;
    },
  };
}
