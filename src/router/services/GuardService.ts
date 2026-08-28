import type { GuardDefinition } from "../types";

export class GuardService {
  canActivate(guards: GuardDefinition[]): boolean {
    return guards.every((guard) => guard.enabled);
  }
}
