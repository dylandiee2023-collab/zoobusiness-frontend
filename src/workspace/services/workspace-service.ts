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
  private readonly api: ApiClientContract;

  constructor(api: ApiClientContract) {
    this.api = api;
  }

  async getCurrentWorkspace(): Promise<CurrentWorkspace> {
    return this.api.get<CurrentWorkspace>("/workspaces/current");
  }

  async createWorkspace(
    payload: CreateWorkspacePayload,
  ): Promise<CurrentWorkspace> {
    return this.api.post<CurrentWorkspace>("/workspaces", payload);
  }

  async bootstrapWorkspace(workspaceId: string): Promise<void> {
    await this.api.post(`/workspaces/${workspaceId}/bootstrap`);
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

    const name = userName.trim().slice(0, 90) || "My Business";
    const nameSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "workspace";
    const suffix =
      userId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toLowerCase() ||
      "default";

    return this.createWorkspace({
      name,
      slug: `${nameSlug}-${suffix}`.slice(0, 100),
    });
  }
}
