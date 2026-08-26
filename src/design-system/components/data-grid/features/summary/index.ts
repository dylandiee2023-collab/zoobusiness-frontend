export interface SummaryRow {
  label: string;

  values:
    Record<
      string,
      unknown
    >;
}

export function createSummary(
  label: string,
  values:
    Record<
      string,
      unknown
    >,
): SummaryRow {
  return {
    label,
    values,
  };
}