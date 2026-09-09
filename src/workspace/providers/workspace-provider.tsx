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
  readonly bootstrapping: boolean;
  readonly bootstrapComplete: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
  readonly bootstrap: () => Promise<void>;
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
  const [bootstrapping, setBootstrapping] = useState(false);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bootstrap = useCallback(async () => {
    if (!workspace) {
      throw new Error("Current workspace is not available.");
    }

    setBootstrapping(true);
    setError(null);

    try {
      await service.bootstrapWorkspace(workspace.id);
      setBootstrapComplete(true);
    } catch (err) {
      setBootstrapComplete(false);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initialize your business workspace.",
      );
      throw err;
    } finally {
      setBootstrapping(false);
    }
  }, [service, workspace]);

  const refresh = useCallback(async () => {
    if (!platform.authentication.authenticated) {
      setWorkspace(null);
      setBootstrapComplete(false);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setBootstrapComplete(false);

    try {
      const user = platform.authentication.user;
      const currentWorkspace =
        user === null
          ? await service.getCurrentWorkspace()
          : await service.ensureWorkspace(user.id, user.name);

      setWorkspace(currentWorkspace);

      if (currentWorkspace.business_category_id !== null) {
        await service.bootstrapWorkspace(currentWorkspace.id);
        setBootstrapComplete(true);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to resolve your business workspace.",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [platform.authentication, service]);

  useEffect(() => {
    if (!platform.runtime.ready) {
      return;
    }

    void refresh().catch(() => undefined);
  }, [platform.runtime.ready, refresh]);

  const value = useMemo(
    () => ({
      workspace,
      loading,
      bootstrapping,
      bootstrapComplete,
      error,
      refresh,
      bootstrap,
    }),
    [
      workspace,
      loading,
      bootstrapping,
      bootstrapComplete,
      error,
      refresh,
      bootstrap,
    ],
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
