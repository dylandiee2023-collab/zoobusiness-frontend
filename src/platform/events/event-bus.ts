import type { EventListener, EventBusContract } from "@/platform/contracts";

export class EventBus implements EventBusContract {
  private readonly listeners = new Map<string, Set<EventListener>>();

  emit<T>(event: string, payload?: T): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(payload);
    }
  }

  on<T>(event: string, listener: EventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener as EventListener);

    return () => this.off(event, listener);
  }

  once<T>(event: string, listener: EventListener<T>): () => void {
    const wrapper: EventListener = (payload) => {
      this.off(event, wrapper);

      listener(payload as T);
    };

    return this.on(event, wrapper);
  }

  off<T>(event: string, listener: EventListener<T>): void {
    this.listeners.get(event)?.delete(listener as EventListener);
  }

  clear(): void {
    this.listeners.clear();
  }
}
