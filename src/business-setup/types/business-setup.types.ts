export interface BusinessCategory {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string | null;
  readonly icon: string | null;
  readonly sortOrder: number;
  readonly status: "ACTIVE" | "INACTIVE";
}

export interface CurrentWorkspace {
  readonly id: string;
  readonly owner_id: string;
  readonly name: string;
  readonly slug: string;
  readonly logo: string | null;
  readonly business_category_id: string | null;
  readonly description: string | null;
  readonly email: string | null;
  readonly phone: string | null;
  readonly address: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly country: string | null;
  readonly timezone: string;
  readonly currency: string;
  readonly status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
}

export interface CompleteBusinessSetupPayload {
  readonly logo?: string;
  readonly businessCategoryId: string;
  readonly description?: string;
  readonly address?: string;
  readonly city?: string;
  readonly region?: string;
  readonly country?: string;
}