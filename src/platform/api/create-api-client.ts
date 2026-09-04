import type { TokenManagerContract } from "@/platform/contracts";

import { ApiClient } from "./api-client";

export function createApiClient(
  tokens: TokenManagerContract,
): ApiClient {
  return new ApiClient(tokens);
}
