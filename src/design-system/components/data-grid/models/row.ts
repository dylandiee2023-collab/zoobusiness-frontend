export interface RowState<T = Record<string, unknown>> {
  id: string;

  original: T;

  selected: boolean;

  expanded: boolean;

  index: number;
}
