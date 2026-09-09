import type { PropsWithChildren } from "react";

import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers";

function RouteLoading() {
  return <main aria-busy="true" />;
}

export function GuestRoute({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const location = useLocation();

  if (!platform.runtime.ready) {
    return <RouteLoading />;
  }

  if (platform.authentication.authenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}

export function AuthenticatedRoute({ children }: PropsWithChildren) {
  const platform = usePlatform();
  const location = useLocation();
  const { refresh } = useWorkspace();

  useEffect(() => {
    if (
      !platform.runtime.ready ||
      !platform.authentication.authenticated
    ) {
      return;
    }

    void refresh();
  }, [
    location.pathname,
    platform.runtime.ready,
    platform.authentication.authenticated,
    refresh,
  ]);

  if (!platform.runtime.ready) {
    return <RouteLoading />;
  }

  if (!platform.authentication.authenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
