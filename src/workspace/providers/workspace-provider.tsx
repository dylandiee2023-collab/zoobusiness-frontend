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
  readonly bootstrap: (workspaceId?: string) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const service = useMemo(
    () => new WorkspaceService(platform.api),
    [platform.api],
  );

  const authentication = platform.authentication;
  const authenticated = authentication.authenticated;
  const user = authentication.user;
  const userId = user?.id ?? null;
  const userName = user?.name ?? "";

  const [authenticationVersion, setAuthenticationVersion] = useState(0);
  const [workspace, setWorkspace] = useState<CurrentWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [bootstrapComplete, setBootstrapComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // WorkspaceProvider must react directly to authentication state changes.
  // This is especially important during the register -> verify-email flow,
  // where verifyEmail() updates the authentication object in place.
  useEffect(() => {
    return authentication.subscribe(() => {
      setAuthenticationVersion((version) => version + 1);
    });
  }, [authentication]);

  const bootstrap = useCallback(
    async (workspaceId?: string) => {
      const targetWorkspaceId = workspaceId ?? workspace?.id;
      const targetWorkspace = workspaceId
        ? workspace?.id === workspaceId
          ? workspace
          : null
        : workspace;

      if (!targetWorkspaceId) {
        throw new Error("Current workspace is not available.");
      }

      if (targetWorkspace && targetWorkspace.business_category_id == null) {
        throw new Error(
          "Complete Business Setup before initializing your workspace.",
        );
      }

      setBootstrapping(true);
      setError(null);

      try {
        await service.bootstrapWorkspace(targetWorkspaceId);
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
    },
    [service, workspace],
  );

  const refresh = useCallback(async () => {
    if (!authenticated) {
      platform.api.setWorkspaceContext(null);
      setWorkspace(null);
      setBootstrapComplete(false);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentWorkspace = await service.ensureWorkspace(userId, userName);

      setWorkspace(currentWorkspace);
      setBootstrapComplete(currentWorkspace.bootstrap_completed);
      platform.api.setWorkspaceContext(currentWorkspace.id);
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
  }, [authenticated, platform.api, service, userId, userName]);

  useEffect(() => {
    // Read the current value so this effect is re-evaluated when the
    // authentication subscription above receives hydrate/login/verify events.
    void authenticationVersion;

    if (!authentication.ready) {
      return;
    }

    queueMicrotask(() => {
      void refresh().catch(() => undefined);
    });
  }, [authentication.ready, authenticationVersion, refresh]);

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

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);

  if (context === null) {
    throw new Error("WorkspaceProvider is missing.");
  }

  return context;
}
