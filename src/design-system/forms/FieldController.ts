export class FieldController {
  private readonly fields = new Map<string, unknown>();

  register(
    id: string,
    field: unknown,
  ): void {
    this.fields.set(id, field);
  }

  unregister(
    id: string,
  ): void {
    this.fields.delete(id);
  }

  get(
    id: string,
  ): unknown {
    return this.fields.get(id);
  }

  has(
    id: string,
  ): boolean {
    return this.fields.has(id);
  }

  clear(): void {
    this.fields.clear();
  }
}