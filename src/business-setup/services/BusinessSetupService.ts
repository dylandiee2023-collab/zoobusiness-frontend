import type { ApiClientContract } from "@/platform/contracts";

import type {
  BusinessCategory,
  CompleteBusinessSetupPayload,
  CurrentWorkspace,
} from "../types/business-setup.types";

export class BusinessSetupService {
  private readonly api: ApiClientContract;

  constructor(api: ApiClientContract) {
    this.api = api;
  }

  async getCategories(): Promise<BusinessCategory[]> {
    return this.api.get<BusinessCategory[]>(
      "/business-categories",
    );
  }

  async getCurrentWorkspace(): Promise<CurrentWorkspace> {
    return this.api.get<CurrentWorkspace>(
      "/workspaces/current",
    );
  }

  async completeSetup(
    workspaceId: string,
    payload: CompleteBusinessSetupPayload,
  ): Promise<CurrentWorkspace> {
    return this.api.post<CurrentWorkspace>(
      `/workspaces/${workspaceId}/complete-setup`,
      payload,
    );
  }

  async bootstrapWorkspace(
    workspaceId: string,
  ): Promise<unknown> {
    return this.api.post(
      `/workspaces/${workspaceId}/bootstrap`,
    );
  }
}