export interface InteractionHandler<TEvent extends Event = Event> {
  (event: TEvent): void;
}

export interface Disposable {
  dispose(): void;
}

export interface InteractionManager {
  enable(): void;

  disable(): void;

  destroy(): void;
}
