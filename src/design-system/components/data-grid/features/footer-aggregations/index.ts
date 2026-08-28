export interface FooterAggregation {
  column: string;

  value: unknown;
}

export function createFooterAggregation(
  column: string,
  value: unknown,
): FooterAggregation {
  return {
    column,
    value,
  };
}
