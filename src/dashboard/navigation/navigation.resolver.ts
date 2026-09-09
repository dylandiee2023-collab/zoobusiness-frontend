import type { NavigationContext, NavigationItem } from "./navigation.types";

export function resolveNavigation(
  items: readonly NavigationItem[],
  context: NavigationContext,
): NavigationItem[] {
  return items.flatMap((item) => {
    if (
      item.businessCategories &&
      !item.businessCategories.includes(context.businessCategory)
    ) {
      return [];
    }

    if (item.permission && !context.permissions.has(item.permission)) {
      return [];
    }

    if (item.children) {
      const children = resolveNavigation(item.children, context);

      if (children.length === 0) {
        return [];
      }

      return [{ ...item, children }];
    }

    return [item];
  });
}
