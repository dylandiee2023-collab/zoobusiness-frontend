import type { ApiClientContract } from "@/platform/contracts";

import { ApiError } from "@/platform/api";

export interface CurrentWorkspace {
  readonly id: string;
  readonly owner_id: string;
  readonly name: string;
  readonly slug: string;
  readonly business_category_id: string | null;
  readonly status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
}

export interface CreateWorkspacePayload {
  readonly name: string;
  readonly slug: string;
}

export class WorkspaceService {
  constructor(private readonly api: ApiClientContract) {}

  async getCurrentWorkspace(): Promise<CurrentWorkspace> {
    return this.api.get<CurrentWorkspace>(
      "/workspaces/current",
    );
  }

  async createWorkspace(
    payload: CreateWorkspacePayload,
  ): Promise<CurrentWorkspace> {
    return this.api.post<CurrentWorkspace>(
      "/workspaces",
      payload,
    );
  }

  async ensureWorkspace(
    userId: string,
    userName: string,
  ): Promise<CurrentWorkspace> {
    try {
      return await this.getCurrentWorkspace();
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 404) {
        throw error;
      }
    }

    const baseName = userName.trim() || "My Business";
    const normalizedName = baseName.slice(0, 90);
    const nameSlug = normalizedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "workspace";

    const uniqueSuffix = userId
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 8)
      .toLowerCase() || "default";

    return this.createWorkspace({
      name: normalizedName,
      slug: `${nameSlug}-${uniqueSuffix}`.slice(0, 100),
    });
  }
}
