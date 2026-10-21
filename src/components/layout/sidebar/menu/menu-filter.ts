import type { MenuGroup, MenuItem } from "./menu.types";

function filterItem(
  item: MenuItem,
  granted: ReadonlySet<string>,
): MenuItem | null {
  if (
    item.permissions?.some((permission) => !granted.has(permission))
  ) {
    return null;
  }

  const children = item.children?.map((child) =>
    filterItem(child, granted),
  ).filter((child): child is MenuItem => child !== null);

  if (item.children && children?.length === 0 && !item.route) {
    return null;
  }

  return {
    ...item,
    ...(item.children ? { children: children ?? [] } : {}),
  };
}

export function filterMenu(
  groups: readonly MenuGroup[],
  permissions: readonly string[] = [],
): MenuGroup[] {
  const granted = new Set(permissions);

  return groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => filterItem(item, granted))
        .filter((item): item is MenuItem => item !== null),
    }))
    .filter((group) => group.items.length > 0);
}