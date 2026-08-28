export type EventListener<T = unknown> = (payload: T) => void;

export interface EventBusContract {
  emit<T = unknown>(event: string, payload?: T): void;

  on<T = unknown>(event: string, listener: EventListener<T>): () => void;

  once<T = unknown>(event: string, listener: EventListener<T>): () => void;

  off<T = unknown>(event: string, listener: EventListener<T>): void;

  clear(): void;
}
