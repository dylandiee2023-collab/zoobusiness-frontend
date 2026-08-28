import { WIDGETS } from "./constants";

export type WidgetType = keyof typeof WIDGETS;

export interface Widget {
  id: WidgetType;
  label: string;
}
