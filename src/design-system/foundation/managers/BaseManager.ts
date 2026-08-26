export abstract class BaseManager {
  protected enabled = false;

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  destroy(): void {
    this.disable();
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}