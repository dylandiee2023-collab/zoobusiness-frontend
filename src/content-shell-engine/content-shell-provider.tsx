import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { useWorkspace } from "@/workspace/providers/workspace-provider";

import type {
  ConfirmDiscard,
  ContentShellEngine,
  ContentShellEntry,
  ContentShellLevel,
  ContentShellSnapshot,
  WorkspaceShellState,
} from "./content-shell.types";

const STORAGE_KEY = "zoobusiness:content-shell:v1";
const DEFAULT_WORKSPACE_ID = "default";

const EMPTY_WORKSPACE: WorkspaceShellState = {
  shell2: null,
  shell3: null,
};

const EMPTY_SNAPSHOT: ContentShellSnapshot = {
  activeWorkspaceId: DEFAULT_WORKSPACE_ID,
  workspaces: { [DEFAULT_WORKSPACE_ID]: EMPTY_WORKSPACE },
};

const ContentShellContext = createContext<ContentShellEngine | null>(null);

function isShellEntry(value: unknown): value is ContentShellEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Partial<ContentShellEntry>;
  return typeof entry.id === "string" && typeof entry.title === "string";
}

function isWorkspaceShellState(value: unknown): value is WorkspaceShellState {
  if (typeof value !== "object" || value === null) return false;
  const state = value as Partial<WorkspaceShellState>;
  return (
    (state.shell2 === null || isShellEntry(state.shell2)) &&
    (state.shell3 === null || isShellEntry(state.shell3))
  );
}

function readSnapshot(): ContentShellSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SNAPSHOT;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return EMPTY_SNAPSHOT;

    const candidate = parsed as Partial<ContentShellSnapshot>;
    if (
      typeof candidate.activeWorkspaceId !== "string" ||
      typeof candidate.workspaces !== "object" ||
      candidate.workspaces === null
    ) {
      return EMPTY_SNAPSHOT;
    }

    const workspaces: Record<string, WorkspaceShellState> = {};
    for (const [workspaceId, value] of Object.entries(candidate.workspaces)) {
      if (isWorkspaceShellState(value)) {
        workspaces[workspaceId] = {
          shell2: value.shell2,
          shell3: value.shell2 ? value.shell3 : null,
        };
      }
    }

    if (!workspaces[candidate.activeWorkspaceId]) {
      workspaces[candidate.activeWorkspaceId] = EMPTY_WORKSPACE;
    }

    return { activeWorkspaceId: candidate.activeWorkspaceId, workspaces };
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function defaultConfirmDiscard(entries: readonly ContentShellEntry[]): boolean {
  if (!entries.some((entry) => entry.dirty)) return true;
  if (typeof window === "undefined") return false;

  return window.confirm(
    "You have unsaved changes. Close this workspace panel and discard them?",
  );
}

export function ContentShellProvider({ children }: PropsWithChildren) {
  const { workspace } = useWorkspace();
  const [snapshot, setSnapshot] = useState<ContentShellSnapshot>(readSnapshot);

  useEffect(() => {
    if (!workspace?.id) return;
    setSnapshot((current) => {
      if (current.activeWorkspaceId === workspace.id) return current;
      return {
        ...current,
        activeWorkspaceId: workspace.id,
        workspaces: {
          ...current.workspaces,
          [workspace.id]: current.workspaces[workspace.id] ?? EMPTY_WORKSPACE,
        },
      };
    });
  }, [workspace?.id]);

  useEffect(() => {
    try {
      // Tab-scoped UI metadata only: no tokens, credentials, or business payloads.
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // The engine remains usable when browser storage is unavailable.
    }
  }, [snapshot]);

  const activeWorkspaceId = snapshot.activeWorkspaceId;
  const activeWorkspace = snapshot.workspaces[activeWorkspaceId] ?? EMPTY_WORKSPACE;

  const setActiveWorkspace = useCallback((workspaceId: string) => {
    const normalizedId = workspaceId.trim();
    if (!normalizedId) return;
    setSnapshot((current) => ({
      ...current,
      activeWorkspaceId: normalizedId,
      workspaces: {
        ...current.workspaces,
        [normalizedId]: current.workspaces[normalizedId] ?? EMPTY_WORKSPACE,
      },
    }));
  }, []);

  const openShell2 = useCallback(
    (entry: ContentShellEntry, options?: { preserveExisting?: boolean }) => {
      setSnapshot((current) => {
        const currentWorkspace = current.workspaces[current.activeWorkspaceId] ?? EMPTY_WORKSPACE;
        const preserveExisting =
          options?.preserveExisting === true && currentWorkspace.shell2?.id === entry.id;
        return {
          ...current,
          workspaces: {
            ...current.workspaces,
            [current.activeWorkspaceId]: {
              shell2: preserveExisting
                ? currentWorkspace.shell2
                : { ...entry, dirty: entry.dirty ?? false },
              shell3: preserveExisting ? currentWorkspace.shell3 : null,
            },
          },
        };
      });
    },
    [],
  );

  const openShell3 = useCallback(
    (entry: ContentShellEntry) => {
      const currentWorkspace = snapshot.workspaces[snapshot.activeWorkspaceId] ?? EMPTY_WORKSPACE;
      if (!currentWorkspace.shell2) return false;

      setSnapshot((current) => ({
        ...current,
        workspaces: {
          ...current.workspaces,
          [current.activeWorkspaceId]: {
            ...(current.workspaces[current.activeWorkspaceId] ?? EMPTY_WORKSPACE),
            shell3: { ...entry, dirty: entry.dirty ?? false },
          },
        },
      }));
      return true;
    },
    [snapshot],
  );

  const updateShellDirty = useCallback(
    (level: ContentShellLevel, dirty: boolean) => {
      setSnapshot((current) => {
        const currentWorkspace = current.workspaces[current.activeWorkspaceId] ?? EMPTY_WORKSPACE;
        const target = level === 2 ? currentWorkspace.shell2 : currentWorkspace.shell3;
        if (!target || target.dirty === dirty) return current;
        return {
          ...current,
          workspaces: {
            ...current.workspaces,
            [current.activeWorkspaceId]: {
              ...currentWorkspace,
              [level === 2 ? "shell2" : "shell3"]: { ...target, dirty },
            },
          },
        };
      });
    },
    [],
  );

  const closeShell3 = useCallback(
    (confirmDiscard: ConfirmDiscard = defaultConfirmDiscard) => {
      const currentWorkspace = snapshot.workspaces[snapshot.activeWorkspaceId] ?? EMPTY_WORKSPACE;
      if (!currentWorkspace.shell3 || !confirmDiscard([currentWorkspace.shell3])) return false;

      setSnapshot((current) => ({
        ...current,
        workspaces: {
          ...current.workspaces,
          [current.activeWorkspaceId]: {
            ...(current.workspaces[current.activeWorkspaceId] ?? EMPTY_WORKSPACE),
            shell3: null,
          },
        },
      }));
      return true;
    },
    [snapshot],
  );

  const closeShell2 = useCallback(
    (confirmDiscard: ConfirmDiscard = defaultConfirmDiscard) => {
      const currentWorkspace = snapshot.workspaces[snapshot.activeWorkspaceId] ?? EMPTY_WORKSPACE;
      if (!currentWorkspace.shell2) return false;

      const entries = [currentWorkspace.shell3, currentWorkspace.shell2].filter(
        (entry): entry is ContentShellEntry => entry !== null,
      );
      if (!confirmDiscard(entries)) return false;

      setSnapshot((current) => ({
        ...current,
        workspaces: {
          ...current.workspaces,
          [current.activeWorkspaceId]: EMPTY_WORKSPACE,
        },
      }));
      return true;
    },
    [snapshot],
  );

  const navigateBack = useCallback(
    (confirmDiscard?: ConfirmDiscard) => {
      const currentWorkspace = snapshot.workspaces[snapshot.activeWorkspaceId] ?? EMPTY_WORKSPACE;
      if (currentWorkspace.shell3) return closeShell3(confirmDiscard);
      if (currentWorkspace.shell2) return closeShell2(confirmDiscard);
      return false;
    },
    [closeShell2, closeShell3, snapshot],
  );

  const value = useMemo<ContentShellEngine>(
    () => ({
      snapshot,
      activeWorkspaceId,
      shell2: activeWorkspace.shell2,
      shell3: activeWorkspace.shell3,
      setActiveWorkspace,
      openShell2,
      openShell3,
      updateShellDirty,
      closeShell3,
      closeShell2,
      navigateBack,
    }),
    [
      snapshot,
      activeWorkspaceId,
      activeWorkspace,
      setActiveWorkspace,
      openShell2,
      openShell3,
      updateShellDirty,
      closeShell3,
      closeShell2,
      navigateBack,
    ],
  );

  return <ContentShellContext.Provider value={value}>{children}</ContentShellContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContentShell(): ContentShellEngine {
  const context = useContext(ContentShellContext);
  if (!context) throw new Error("ContentShellProvider is missing from the app provider tree.");
  return context;
}
