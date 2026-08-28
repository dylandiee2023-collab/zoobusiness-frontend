import { BaseRegistry } from "../foundation/registry";

import type { FormInstance } from "./Form.types";

export class FormRegistry extends BaseRegistry<string, FormInstance> {
  register(form: FormInstance): void {
    this.set(form.id, form);
  }

  unregister(id: string): void {
    this.delete(id);
  }

  get(id: string): FormInstance | undefined {
    return this.getValue(id);
  }

  getAll(): FormInstance[] {
    return [...this.values()];
  }

  has(id: string): boolean {
    return this.hasValue(id);
  }
}
