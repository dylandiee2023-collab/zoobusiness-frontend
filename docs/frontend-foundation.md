# ZooBusiness Frontend Foundation

## Scope

This repository is the **Retail frontend foundation**. It does not contain YRP pages or YRP application logic.
The current branch intentionally has no page modules. Pages will be added only after the foundation phases are complete.

## Layer boundaries

### 1. App composition
- `src/App.tsx` is the composition root.
- `src/app/providers` owns global React providers.
- `src/app/shell` owns the root DOM shell only.
- `src/app/router` owns React Router integration and the application route table.

### 2. Platform
- `src/platform` contains browser/application infrastructure that is not page-specific: API, authentication, session, storage, permissions, navigation, route registry, runtime, telemetry, etc.
- Platform services must not import pages, feature UI, or shells.

### 3. Workspace/business context
- `src/workspace` owns current-workspace resolution, bootstrap state, and workspace access.
- `src/business-setup` contains business-setup domain services/types; its UI belongs in pages when page work resumes.

### 4. Design system
- `src/theme` is the source of truth for visual tokens.
- `src/design-system` is the source of reusable UI primitives/components.
- Components must consume semantic theme tokens instead of hard-coded product colors, spacing, shadows, or Tailwind-only class strings.

### 5. Shells/layouts
- `src/shells` owns reusable application shells (auth, dashboard, POS, public, blank, error, etc.).
- Shells provide structure; pages provide page content.
- Shells must not own business data fetching.

### 6. Dashboard engine
- `src/dashboard/engine`, `foundation`, `kernel`, `registry`, `resolver`, and related infrastructure are core dashboard infrastructure.
- Navigation configuration is permission-driven. It must not contain the removed Digital Content business category.

## Canonical UI flow

`App -> Providers -> Root Shell -> React Router -> Route -> Shell -> Page -> Design System`

Business/domain services are injected below the page layer; they are never implemented inside presentational components.

## Rules for new work

1. Do not create another Button/Input/Card system when an existing design-system primitive can be extended.
2. Do not put route definitions inside page components.
3. Do not put navigation labels/routes directly into shell markup.
4. Do not use Unicode/emoji as product icons; use the icon system.
5. Do not use raw product colors or Tailwind utility strings in reusable design-system components.
6. Do not import from `src/pages` into platform, workspace, dashboard engine, design-system, or shells.
7. Keep feature-specific data fetching in feature/domain services, not UI primitives.
8. Route metadata and navigation metadata must be centralized so page construction does not create a second navigation system.

## Current deliberate separation

There are two kinds of routing infrastructure:
- `src/app/router`: React Router application integration.
- `src/platform/routes` and `src/router`: framework-neutral/platform route infrastructure.

The latter is not a second page router. It is infrastructure for route registration/metadata and must not be wired into React Router as a competing navigation tree.

## Phase gate

No authentication pages, business-setup pages, dashboard pages, or feature pages should be implemented until this foundation remains buildable and the route table is intentionally populated.
