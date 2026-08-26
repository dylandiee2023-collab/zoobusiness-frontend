import type {
  OrganizationType,
} from "@/dashboard/foundation";

import {
  getOrganizationType,
} from "@/dashboard/foundation";

export interface OrganizationEngine {
  current: OrganizationType;

  exists(): boolean;

  resolve(): {
    id: OrganizationType;
    label: string;
  };

  is(
    organization: OrganizationType,
  ): boolean;
}

export function createOrganizationEngine(
  organization: OrganizationType,
): OrganizationEngine {
  return {
    current: organization,

    exists(): boolean {
      return !!getOrganizationType(
        organization,
      );
    },

    resolve() {
      return getOrganizationType(
        organization,
      );
    },

    is(
      target: OrganizationType,
    ): boolean {
      return organization === target;
    },
  };
}