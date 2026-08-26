export type AuthenticationState =
  | "signed-out"
  | "signing-in"
  | "authenticated"
  | "refreshing"
  | "expired";