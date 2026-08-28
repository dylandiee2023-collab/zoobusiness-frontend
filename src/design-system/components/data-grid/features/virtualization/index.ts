export interface VirtualRange {
  start: number;

  end: number;
}

export function getVirtualRange(
  scrollTop: number,
  rowHeight: number,
  viewportHeight: number,
  totalRows: number,
  overscan = 5,
): VirtualRange {
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);

  const visible = Math.ceil(viewportHeight / rowHeight);

  const end = Math.min(totalRows, start + visible + overscan * 2);

  return {
    start,
    end,
  };
}
