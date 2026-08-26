export class NavigationHistory {
  private readonly history: string[] =
    [];

  push(
    path: string,
  ): void {
    this.history.push(path);
  }

  back():
    string | undefined {
    return this.history.pop();
  }

  current():
    string | undefined {
    return this.history.at(-1);
  }

  all():
    readonly string[] {
    return this.history;
  }

  clear(): void {
    this.history.length = 0;
  }
}