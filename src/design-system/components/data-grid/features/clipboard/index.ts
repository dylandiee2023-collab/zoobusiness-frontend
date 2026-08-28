export async function copyText(value: string): Promise<void> {
  await navigator.clipboard.writeText(value);
}

export async function pasteText(): Promise<string> {
  return navigator.clipboard.readText();
}
