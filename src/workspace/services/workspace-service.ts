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
  private ensureWorkspaceInFlight: Promise<CurrentWorkspace> | null = null;

  constructor(api: ApiClientContract) {
    this.api = api;
  }

  async getCurrentWorkspace(): Promise<CurrentWorkspace> {
    return this.api.get<CurrentWorkspace>("/api/workspaces/current");
  }

  async createWorkspace(
    payload: CreateWorkspacePayload,
  ): Promise<CurrentWorkspace> {
    return this.api.post<CurrentWorkspace>("/api/workspaces", payload);
  }

  async bootstrapWorkspace(workspaceId: string): Promise<void> {
    await this.api.post(`/api/workspaces/${workspaceId}/bootstrap`);
  }

  async ensureWorkspace(
    userId: string,
    userName: string,
  ): Promise<CurrentWorkspace> {
    if (this.ensureWorkspaceInFlight !== null) {
      return this.ensureWorkspaceInFlight;
    }

    this.ensureWorkspaceInFlight = this.resolveWorkspace(
      userId,
      userName,
    ).finally(() => {
      this.ensureWorkspaceInFlight = null;
    });

    return this.ensureWorkspaceInFlight;
  }

  private async resolveWorkspace(
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
    const nameSlug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 70) || "workspace";
    const suffix =
      userId
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 8)
        .toLowerCase() || "default";

    return this.createWorkspace({
      name,
      slug: `${nameSlug}-${suffix}`.slice(0, 100),
    });
  }
}
