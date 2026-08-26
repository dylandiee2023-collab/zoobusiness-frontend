export class ScrollLock {
  private lockCount = 0;

  lock(): void {
    this.lockCount += 1;

    if (this.lockCount > 1) {
      return;
    }

    document.body.style.overflow = "hidden";
  }

  unlock(): void {
    if (this.lockCount === 0) {
      return;
    }

    this.lockCount -= 1;

    if (this.lockCount > 0) {
      return;
    }

    document.body.style.overflow = "";
  }

  isLocked(): boolean {
    return this.lockCount > 0;
  }
}