import type {
  OverlayInstance,
} from "../contracts";

export class OverlayRegistry {
  private readonly overlays =
    new Map<string, OverlayInstance>();

  register(
    overlay: OverlayInstance,
  ): void {
    this.overlays.set(
      overlay.id,
      overlay,
    );
  }

  unregister(
    id: string,
  ): void {
    this.overlays.delete(id);
  }

  exists(
    id: string,
  ): boolean {
    return this.overlays.has(id);
  }

  get(
    id: string,
  ): OverlayInstance | undefined {
    return this.overlays.get(id);
  }

  getAll(): OverlayInstance[] {
    return [
      ...this.overlays.values(),
    ];
  }

  getOpen(): OverlayInstance[] {
    return this.getAll().filter(
      overlay => overlay.open,
    );
  }

  isOpen(
    id: string,
  ): boolean {
    return (
      this.overlays.get(id)?.open ??
      false
    );
  }

  open(
    id: string,
  ): boolean {
    const overlay =
      this.overlays.get(id);

    if (!overlay) {
      return false;
    }

    overlay.open = true;

    return true;
  }

  close(
    id: string,
  ): boolean {
    const overlay =
      this.overlays.get(id);

    if (!overlay) {
      return false;
    }

    overlay.open = false;

    return true;
  }

  toggle(
    id: string,
  ): boolean {
    const overlay =
      this.overlays.get(id);

    if (!overlay) {
      return false;
    }

    overlay.open =
      !overlay.open;

    return true;
  }

  closeAll(): void {
    for (const overlay of this.overlays.values()) {
      overlay.open = false;
    }
  }

  clear(): void {
    this.overlays.clear();
  }

  size(): number {
    return this.overlays.size;
  }
}