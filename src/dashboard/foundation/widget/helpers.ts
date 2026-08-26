import { WIDGETS } from "./constants";
import type { WidgetType } from "./types";

export function getWidget(
  widget: WidgetType,
) {
  return WIDGETS[widget];
}

export function isSalesWidget(
  widget: WidgetType,
): boolean {
  return widget === "sales";
}

export function isRevenueWidget(
  widget: WidgetType,
): boolean {
  return widget === "revenue";
}

export function isOrdersWidget(
  widget: WidgetType,
): boolean {
  return widget === "orders";
}

export function isCustomersWidget(
  widget: WidgetType,
): boolean {
  return widget === "customers";
}

export function isInventoryWidget(
  widget: WidgetType,
): boolean {
  return widget === "inventory";
}

export function isProductsWidget(
  widget: WidgetType,
): boolean {
  return widget === "products";
}

export function isActivitiesWidget(
  widget: WidgetType,
): boolean {
  return widget === "activities";
}

export function isAnalyticsWidget(
  widget: WidgetType,
): boolean {
  return widget === "analytics";
}