export class NavigationService {
  private history: string[] = [];

  visit(path: string): void {
    this.history.push(path);
  }

  current(): string | undefined {
    return this.history.at(-1);
  }

  previous(): string | undefined {
    return this.history.at(-2);
  }

  clear(): void {
    this.history = [];
  }
}
