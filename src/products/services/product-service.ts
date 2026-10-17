import type { ApiClientContract } from "@/platform/contracts";

export type ProductStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type ProductType = "PHYSICAL" | "SERVICE" | "DIGITAL";

export interface ProductRecord extends Record<string, unknown> {
  readonly id: string;
  readonly workspace_id: string;
  readonly category_id: string | null;
  readonly unit_id: string | null;
  readonly name: string;
  readonly slug: string;
  readonly sku: string | null;
  readonly description: string | null;
  readonly product_type: ProductType;
  readonly status: ProductStatus;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ProductListResponse {
  readonly data: ProductRecord[];
  readonly meta: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export interface ProductListFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly categoryId?: string;
  readonly status?: ProductStatus | "";
  readonly productType?: ProductType | "";
}

export interface ProductOption {
  readonly id: string;
  readonly name: string;
  readonly slug?: string;
  readonly code?: string;
  readonly symbol?: string | null;
  readonly parent_id?: string | null;
}

export interface CreateProductPayload {
  readonly name: string;
  readonly slug: string;
  readonly sku?: string | null;
  readonly description?: string | null;
  readonly categoryId?: string | null;
  readonly unitId?: string | null;
  readonly productType: ProductType;
  readonly status: ProductStatus;
}

export class ProductService {
  constructor(private readonly api: ApiClientContract) {}

  list(
    workspaceId: string,
    filters: ProductListFilters = {},
  ): Promise<ProductListResponse> {
    const query = new URLSearchParams();
    query.set("page", String(filters.page ?? 1));
    query.set("limit", String(filters.limit ?? 20));

    if (filters.search?.trim()) query.set("search", filters.search.trim());
    if (filters.categoryId) query.set("categoryId", filters.categoryId);
    if (filters.status) query.set("status", filters.status);
    if (filters.productType) query.set("productType", filters.productType);

    return this.api.get<ProductListResponse>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/products?${query.toString()}`,
    );
  }

  categories(workspaceId: string): Promise<ProductOption[]> {
    return this.api.get<ProductOption[]>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/product-options/categories`,
    );
  }

  units(workspaceId: string): Promise<ProductOption[]> {
    return this.api.get<ProductOption[]>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/product-options/units`,
    );
  }

  update(
    workspaceId: string,
    productId: string,
    payload: Partial<CreateProductPayload>,
  ): Promise<ProductRecord> {
    return this.api.patch<ProductRecord>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/products/${encodeURIComponent(productId)}`,
      payload,
    );
  }

  updateStatus(
    workspaceId: string,
    productId: string,
    status: ProductStatus,
  ): Promise<ProductRecord> {
    return this.api.patch<ProductRecord>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/products/${encodeURIComponent(productId)}/status`,
      { status },
    );
  }

  remove(workspaceId: string, productId: string): Promise<{ message: string; productId: string }> {
    return this.api.delete<{ message: string; productId: string }>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/products/${encodeURIComponent(productId)}`,
    );
  }

  create(
    workspaceId: string,
    payload: CreateProductPayload,
  ): Promise<ProductRecord> {
    return this.api.post<ProductRecord>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/products`,
      payload,
    );
  }
}
