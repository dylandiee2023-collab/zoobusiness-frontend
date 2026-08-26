import type {
  OverlayInstance,
} from "../contracts";

import {
  OverlayRegistry,
} from "../registry";

export class OverlayManager {
  private readonly registry: OverlayRegistry;

  constructor(
    registry: OverlayRegistry,
  ) {
    this.registry = registry;
  }

  register(
    overlay: OverlayInstance,
  ): void {
    this.registry.register(overlay);
  }

  unregister(
    id: string,
  ): void {
    this.registry.unregister(id);
  }

  open(
    id: string,
  ): boolean {
    return this.registry.open(id);
  }

  close(
    id: string,
  ): boolean {
    return this.registry.close(id);
  }

  toggle(
    id: string,
  ): boolean {
    return this.registry.toggle(id);
  }

  isOpen(
    id: string,
  ): boolean {
    return this.registry.isOpen(id);
  }

  exists(
    id: string,
  ): boolean {
    return this.registry.exists(id);
  }

  get(
    id: string,
  ): OverlayInstance | undefined {
    return this.registry.get(id);
  }

  getAll(): OverlayInstance[] {
    return this.registry.getAll();
  }

  getActive(): OverlayInstance[] {
    return this.registry.getOpen();
  }

  closeAll(): void {
    this.registry.closeAll();
  }

  clear(): void {
    this.registry.clear();
  }
}