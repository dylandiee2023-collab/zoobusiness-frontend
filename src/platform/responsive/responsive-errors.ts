export class ResponsiveError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ResponsiveError";
  }
}
