export function shouldLoadMore(
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number,
  threshold = 200,
): boolean {
  return scrollTop + clientHeight >= scrollHeight - threshold;
}
