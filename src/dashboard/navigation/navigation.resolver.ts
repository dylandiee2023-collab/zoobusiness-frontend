import type { NavigationContext, NavigationItem } from "./navigation.types";

export function resolveNavigation(
  items: readonly NavigationItem[],
  context: NavigationContext,
): NavigationItem[] {
  return items.flatMap((item) => {
    if (item.businessCategories && !item.businessCategories.includes(context.businessCategory)) {
      return [];
    }

    if (item.permission && !context.permissions.has(item.permission)) {
      return [];
    }

    const children = item.children
      ? resolveNavigation(item.children, context)
      : undefined;

    // A section with no accessible children is hidden entirely.
    if (item.children && children?.length === 0) {
      return [];
    }

    return [{ ...item, children }];
  });
}
