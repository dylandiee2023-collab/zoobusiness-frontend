import type { MenuGroup } from "./menu.types";

/**
 * Filter navigation against the permissions loaded for the active workspace.
 * Items without a permission requirement (for example Profile and Tools)
 * remain available; protected routes must still enforce permissions themselves.
 */
export function filterMenu(
  groups: readonly MenuGroup[],
  permissions: readonly string[] = [],
): readonly MenuGroup[] {
  const granted = new Set(permissions);

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !item.permissions?.length ||
          item.permissions.every((permission) => granted.has(permission)),
      ),
    }))
    .filter((group) => group.items.length > 0);
}
