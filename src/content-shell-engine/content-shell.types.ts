export type ContentShellLevel = 2 | 3;

export interface ContentShellEntry {
  /** Stable module/workflow identifier, not a React key generated at render time. */
  readonly id: string;
  readonly title: string;
  /** Optional route associated with the shell; content rendering stays module-owned. */
  readonly href?: string;
  /** Set when the module has edits that have not been saved. */
  readonly dirty?: boolean;
}

export interface WorkspaceShellState {
  readonly shell2: ContentShellEntry | null;
  readonly shell3: ContentShellEntry | null;
}

export interface ContentShellSnapshot {
  readonly activeWorkspaceId: string;
  readonly workspaces: Readonly<Record<string, WorkspaceShellState>>;
}

export interface OpenShellOptions {
  readonly preserveExisting?: boolean;
}

export type ConfirmDiscard = (entries: readonly ContentShellEntry[]) => boolean;

export interface ContentShellEngine {
  readonly snapshot: ContentShellSnapshot;
  readonly shell2: ContentShellEntry | null;
  readonly shell3: ContentShellEntry | null;
  readonly activeWorkspaceId: string;
  setActiveWorkspace(workspaceId: string): void;
  openShell2(entry: ContentShellEntry, options?: OpenShellOptions): void;
  openShell3(entry: ContentShellEntry): boolean;
  updateShellDirty(level: ContentShellLevel, dirty: boolean): void;
  closeShell3(confirmDiscard?: ConfirmDiscard): boolean;
  closeShell2(confirmDiscard?: ConfirmDiscard): boolean;
  /** Closes the deepest open shell first. Returns false when no shell was open or close was cancelled. */
  navigateBack(confirmDiscard?: ConfirmDiscard): boolean;
}
