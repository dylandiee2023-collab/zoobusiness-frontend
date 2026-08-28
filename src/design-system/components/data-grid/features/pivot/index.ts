export interface PivotField {
  id: string;

  title: string;
}

export interface PivotConfig {
  rows: PivotField[];

  columns: PivotField[];

  values: PivotField[];
}
