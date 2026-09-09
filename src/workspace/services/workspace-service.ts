import type { ApiClientContract } from "@/platform/contracts";

export interface CurrentWorkspace {
  readonly id: string;
  readonly owner_id: string;
  readonly name: string;
  readonly slug: string;
  readonly business_category_id: string | null;
  readonly status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
}

export class WorkspaceService {
  constructor(private readonly api: ApiClientContract) {}

  async getCurrentWorkspace(): Promise<CurrentWorkspace> {
    return this.api.get<CurrentWorkspace>(
      "/api/workspaces/current",
    );
  }
}
