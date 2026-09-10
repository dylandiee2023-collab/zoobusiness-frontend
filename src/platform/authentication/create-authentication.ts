import type {
  ApiClientContract,
  SessionContract,
  TokenManagerContract,
} from "@/platform/contracts";

import { Authentication } from "./authentication";

export function createAuthentication(
  api: ApiClientContract,
  tokens: TokenManagerContract,
  session: SessionContract,
): Authentication {
  return new Authentication(api, tokens, session);
}
