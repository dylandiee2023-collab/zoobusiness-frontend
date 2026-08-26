export type Formula =
  | "SUM"
  | "AVG"
  | "MIN"
  | "MAX"
  | "COUNT";

export function evaluateFormula(
  formula: Formula,
  values: number[],
): number {
  switch (formula) {
    case "SUM":
      return values.reduce(
        (a, b) => a + b,
        0,
      );

    case "AVG":
      return values.length
        ? values.reduce(
            (a, b) =>
              a + b,
            0,
          ) /
            values.length
        : 0;

    case "MIN":
      return Math.min(
        ...values,
      );

    case "MAX":
      return Math.max(
        ...values,
      );

    case "COUNT":
      return values.length;
  }
}