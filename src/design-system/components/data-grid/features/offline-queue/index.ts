export class OfflineQueue<
  T = unknown,
> {
  private readonly queue:
    T[] = [];

  enqueue(
    item: T,
  ): void {
    this.queue.push(
      item,
    );
  }

  dequeue():
    | T
    | undefined {
    return this.queue.shift();
  }

  clear(): void {
    this.queue.length = 0;
  }

  getAll(): T[] {
    return [
      ...this.queue,
    ];
  }
}