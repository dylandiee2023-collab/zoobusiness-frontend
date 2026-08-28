import { HistoryStack } from "../history";

export class UndoRedoManager<T> {
  readonly undo = new HistoryStack<T>();

  readonly redo = new HistoryStack<T>();

  save(state: T): void {
    this.undo.push(state);
    this.redo.clear();
  }

  undoState(): T | undefined {
    const state = this.undo.pop();

    if (state) {
      this.redo.push(state);
    }

    return state;
  }

  redoState(): T | undefined {
    const state = this.redo.pop();

    if (state) {
      this.undo.push(state);
    }

    return state;
  }
}
