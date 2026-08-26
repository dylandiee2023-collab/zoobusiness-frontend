export class HistoryStack<T> {
  private readonly stack: T[] = [];

  push(value: T): void {
    this.stack.push(value);
  }

  pop(): T | undefined {
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack.at(-1);
  }

  clear(): void {
    this.stack.length = 0;
  }

  size(): number {
    return this.stack.length;
  }
}