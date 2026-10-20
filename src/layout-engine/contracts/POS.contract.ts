/**
 * Persistence contract for resumable POS carts.
 *
 * Drafts are business records and must be backed by the authenticated API,
 * not browser storage. The drawer/page will consume this contract when its
 * backend endpoint is verified; this file intentionally implements no UI.
 */
export interface POSCartDraftLine {
  readonly productId: string;
  readonly productName: string;
  readonly sku?: string;
  readonly quantity: number;
  /** Decimal string to avoid binary floating-point currency rounding. */
  readonly unitPrice: string;
  readonly discountAmount?: string;
}

export interface POSCartDraft {
  readonly id: string;
  readonly workspaceId: string;
  readonly customerId?: string | null;
  readonly currency: string;
  readonly lines: readonly POSCartDraftLine[];
  readonly note?: string;
  readonly status: "draft";
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SavePOSCartDraftInput {
  readonly id?: string;
  readonly customerId?: string | null;
  readonly currency: string;
  readonly lines: readonly POSCartDraftLine[];
  readonly note?: string;
}

export interface POSCartDraftRepository {
  listDrafts(): Promise<readonly POSCartDraft[]>;
  getDraft(id: string): Promise<POSCartDraft | null>;
  saveDraft(input: SavePOSCartDraftInput): Promise<POSCartDraft>;
}
