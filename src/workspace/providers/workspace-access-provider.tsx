import type { PropsWithChildren } from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "./workspace-provider";

export interface WorkspaceAccess {
  readonly workspaceId: string;
  readonly role: string;
  readonly permissions: readonly string[];
}

interface WorkspaceAccessResponse {
  readonly workspaceId: string;
  readonly role: string;
  readonly permissions: readonly string[];
}

interface WorkspaceAccessContextValue {
  readonly access: WorkspaceAccess | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
  readonly has: (permission: string) => boolean;
  readonly hasAny: (permissions: readonly string[]) => boolean;
  readonly hasAll: (permissions: readonly string[]) => boolean;
}

const WorkspaceAccessContext =
  createContext<WorkspaceAccessContextValue | null>(null);

export function WorkspaceAccessProvider({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const { workspace } = useWorkspace();
  const [access, setAccess] = useState<WorkspaceAccess | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestInFlight = useRef<Promise<void> | null>(null);

  const refresh = useCallback(async () => {
    if (workspace === null) {
      platform.permissions.clear();
      setAccess(null);
      setError(null);
      setLoading(false);
      return;
    }

    if (requestInFlight.current !== null) {
      return requestInFlight.current;
    }

    const request = (async () => {
      setLoading(true);
      setError(null);
      platform.permissions.clear();

      try {
        const response = await platform.api.get<WorkspaceAccessResponse>(
          "/api/workspaces/current/access",
        );
        const nextAccess: WorkspaceAccess = {
          workspaceId: response.workspaceId,
          role: response.role,
          permissions: [...response.permissions],
        };

        setAccess(nextAccess);
        platform.permissions.setPermissions(nextAccess.permissions);
      } catch (err) {
        setAccess(null);
        platform.permissions.clear();
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load workspace access.",
        );
        throw err;
      } finally {
        setLoading(false);
        requestInFlight.current = null;
      }
    })();

    requestInFlight.current = request;
    return request;
  }, [platform, workspace]);

  useEffect(() => {
    queueMicrotask(() => {
      void refresh().catch(() => undefined);
    });
  }, [refresh]);

  const has = useCallback(
    (permission: string) => access?.permissions.includes(permission) ?? false,
    [access],
  );

  const hasAny = useCallback(
    (permissions: readonly string[]) =>
      permissions.some((permission) => has(permission)),
    [has],
  );

  const hasAll = useCallback(
    (permissions: readonly string[]) =>
      permissions.every((permission) => has(permission)),
    [has],
  );

  const value = useMemo(
    () => ({
      access,
      loading,
      error,
      refresh,
      has,
      hasAny,
      hasAll,
    }),
    [access, loading, error, refresh, has, hasAny, hasAll],
  );

  return (
    <WorkspaceAccessContext.Provider value={value}>
      {children}
    </WorkspaceAccessContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspaceAccess(): WorkspaceAccessContextValue {
  const context = useContext(WorkspaceAccessContext);

  if (context === null) {
    throw new Error("WorkspaceAccessProvider is missing.");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePermission(permission: string): boolean {
  return useWorkspaceAccess().has(permission);
}
