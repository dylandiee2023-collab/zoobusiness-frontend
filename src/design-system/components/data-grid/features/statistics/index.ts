export interface Statistics {
  count: number;

  sum: number;

  average: number;

  minimum: number;

  maximum: number;
}

export function calculateStatistics(values: number[]): Statistics {
  const count = values.length;

  const sum = values.reduce((a, b) => a + b, 0);

  return {
    count,
    sum,
    average: count === 0 ? 0 : sum / count,
    minimum: count === 0 ? 0 : Math.min(...values),
    maximum: count === 0 ? 0 : Math.max(...values),
  };
}
