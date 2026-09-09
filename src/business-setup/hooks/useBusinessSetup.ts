import { useCallback, useEffect, useMemo, useState } from "react";

import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers";

import { BusinessSetupService } from "../services/BusinessSetupService";
import type {
  BusinessCategory,
  CompleteBusinessSetupPayload,
} from "../types/business-setup.types";

export function useBusinessSetup() {
  const { api } = usePlatform();
  const {
    workspace,
    loading: workspaceLoading,
    bootstrapping,
    bootstrapComplete,
    error: workspaceError,
    refresh: refreshWorkspace,
    bootstrap,
  } = useWorkspace();

  const service = useMemo(
    () => new BusinessSetupService(api),
    [api],
  );

  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);

    try {
      setCategories(await service.getCategories());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load business categories.",
      );
    } finally {
      setCategoriesLoading(false);
    }
  }, [service]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const completeSetup = useCallback(
    async (payload: CompleteBusinessSetupPayload) => {
      if (!workspace) {
        throw new Error("Current workspace is not available.");
      }

      setSubmitting(true);
      setError(null);

      try {
        if (workspace.business_category_id === null) {
          await service.completeSetup(workspace.id, payload);
        }

        await refreshWorkspace();
        return workspace;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to complete business setup.",
        );
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [refreshWorkspace, service, workspace],
  );

  const retryBootstrap = useCallback(async () => {
    setError(null);

    try {
      await bootstrap();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initialize your business workspace.",
      );
      throw err;
    }
  }, [bootstrap]);

  return {
    workspace,
    categories,
    loading: workspaceLoading || categoriesLoading,
    submitting: submitting || bootstrapping,
    bootstrapComplete,
    error: error ?? workspaceError,
    completeSetup,
    retryBootstrap,
    reload: async () => {
      await Promise.all([refreshWorkspace(), loadCategories()]);
    },
  };
}
