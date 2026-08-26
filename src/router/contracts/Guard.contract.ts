import type {
  GuardDefinition,
  RouteDefinition,
} from "../types";

export interface GuardContract {
  canActivate(
    route: RouteDefinition,
    guards: GuardDefinition[],
  ): boolean;
}