export interface ExcelSheet<
  T = Record<
    string,
    unknown
  >,
> {
  name: string;

  rows: T[];
}

export function createWorkbook<
  T extends Record<
    string,
    unknown
  >,
>(
  sheet: ExcelSheet<T>,
) {
  return {
    sheets: [
      sheet,
    ],
  };
}