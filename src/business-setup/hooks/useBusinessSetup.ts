import { useCallback, useEffect, useMemo, useState } from "react";

import { usePlatform } from "@/platform/providers/use-platform";

import { BusinessSetupService } from "../services/BusinessSetupService";
import type {
  BusinessCategory,
  CompleteBusinessSetupPayload,
  CurrentWorkspace,
} from "../types/business-setup.types";

export function useBusinessSetup() {
  const { api } = usePlatform();

  const service = useMemo(
    () => new BusinessSetupService(api),
    [api],
  );

  const [workspace, setWorkspace] =
    useState<CurrentWorkspace | null>(null);

  const [categories, setCategories] =
    useState<BusinessCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] =
    useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        currentWorkspace,
        businessCategories,
      ] = await Promise.all([
        service.getCurrentWorkspace(),
        service.getCategories(),
      ]);

      setWorkspace(currentWorkspace);
      setCategories(businessCategories);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load business setup.",
      );
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const [
          currentWorkspace,
          businessCategories,
        ] = await Promise.all([
          service.getCurrentWorkspace(),
          service.getCategories(),
        ]);

        if (cancelled) {
          return;
        }

        setWorkspace(currentWorkspace);
        setCategories(businessCategories);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load business setup.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
  }, [service]);

  const completeSetup = useCallback(
    async (
      payload: CompleteBusinessSetupPayload,
    ) => {
      if (!workspace) {
        throw new Error(
          "Current workspace is not available.",
        );
      }

      setSubmitting(true);
      setError(null);

      try {
        const updatedWorkspace =
          await service.completeSetup(
            workspace.id,
            payload,
          );

        await service.bootstrapWorkspace(
          workspace.id,
        );

        setWorkspace(updatedWorkspace);

        return updatedWorkspace;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to complete business setup.";

        setError(message);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [service, workspace],
  );

  return {
    workspace,
    categories,
    loading,
    submitting,
    error,
    completeSetup,
    reload: load,
  };
}