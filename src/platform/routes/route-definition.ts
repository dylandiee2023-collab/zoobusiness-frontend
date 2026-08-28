export interface RouteDefinition {
  readonly id: string;

  readonly path: string;

  readonly component: unknown;

  readonly layout?: string;

  readonly permissions?: readonly string[];

  readonly children?: readonly RouteDefinition[];
}
