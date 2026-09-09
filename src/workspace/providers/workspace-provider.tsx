import type { PropsWithChildren } from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { usePlatform } from "@/platform/providers/use-platform";

import {
  WorkspaceService,
  type CurrentWorkspace,
} from "../services/workspace-service";

interface WorkspaceContextValue {
  readonly workspace: CurrentWorkspace | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const service = useMemo(
    () => new WorkspaceService(platform.api),
    [platform.api],
  );

  const [workspace, setWorkspace] = useState<CurrentWorkspace | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!platform.authentication.authenticated) {
      setWorkspace(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = platform.authentication.user;

      if (user === null) {
        throw new Error("Signed-in user is not available.");
      }

      const currentWorkspace = await service.ensureWorkspace(
        user.id,
        user.name,
      );

      setWorkspace(currentWorkspace);
    } catch (err) {
      setWorkspace(null);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resolve current workspace.",
      );
    } finally {
      setLoading(false);
    }
  }, [platform.authentication, service]);

  useEffect(() => {
    if (!platform.runtime.ready) {
      return;
    }

    void refresh();
  }, [platform.runtime.ready, refresh]);

  const value = useMemo(
    () => ({ workspace, loading, error, refresh }),
    [workspace, loading, error, refresh],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);

  if (context === null) {
    throw new Error("WorkspaceProvider is missing.");
  }

  return context;
}
