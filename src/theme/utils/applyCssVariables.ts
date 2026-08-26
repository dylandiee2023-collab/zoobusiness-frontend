export function applyCssVariables(
  variables: Record<string, string>,
): void {
  const root = document.documentElement;

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}