export interface CellPosition {
  row: number;
  column: number;
}

export interface CellRange {
  start: CellPosition;
  end: CellPosition;
}

export function createRange(
  start: CellPosition,
  end: CellPosition,
): CellRange {
  return {
    start,
    end,
  };
}

export function inRange(
  cell: CellPosition,
  range: CellRange,
): boolean {
  const minRow = Math.min(
    range.start.row,
    range.end.row,
  );

  const maxRow = Math.max(
    range.start.row,
    range.end.row,
  );

  const minColumn = Math.min(
    range.start.column,
    range.end.column,
  );

  const maxColumn = Math.max(
    range.start.column,
    range.end.column,
  );

  return (
    cell.row >= minRow &&
    cell.row <= maxRow &&
    cell.column >=
      minColumn &&
    cell.column <=
      maxColumn
  );
}