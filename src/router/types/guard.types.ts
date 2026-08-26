export type GuardType =
  | "auth"
  | "guest"
  | "role"
  | "permission"
  | "subscription"
  | "feature";

export interface GuardDefinition {
  type: GuardType;

  enabled: boolean;
}