import type { PlatformContract } from "@/platform/contracts";

import {
  createKernel,
  createBootstrap,
  createRuntime,
  createEnvironment,
  createConfiguration,
  createLogger,
  createEventBus,
  createStorage,
  createPreferences,
  createSession,
  createHttpClient,
  createApiClient,
  createAuthentication,
  createTokenManager,
  createCache,
  createTelemetry,
  createUpload,
  createDownload,
  createTheme,
  createResponsive,
  createIconEngine,
  createPermissionEngine,
  createMenuEngine,
  createRouteEngine,
  createNavigationEngine,
  createWidgetEngine,
  createLayoutEngine,
  createSearchEngine,
  createNotificationEngine,
  createCommandEngine,
} from "@/platform";

export class Platform implements PlatformContract {
  private readonly kernel = createKernel();

  readonly bootstrap = createBootstrap(this.kernel);

  readonly runtime = createRuntime(this.bootstrap);

  readonly environment = createEnvironment();

  readonly configuration = createConfiguration();

  readonly logger = createLogger();

  readonly events = createEventBus();

  readonly storage = createStorage();

  readonly preferences = createPreferences();

  readonly session = createSession();

  readonly http = createHttpClient();

  readonly api = createApiClient();

  readonly authentication = createAuthentication();

  readonly tokens = createTokenManager();

  readonly cache = createCache();

  readonly telemetry = createTelemetry();

  readonly upload = createUpload();

  readonly download = createDownload();

  readonly theme = createTheme();

  readonly responsive = createResponsive();

  readonly icons = createIconEngine();

  readonly permissions = createPermissionEngine();

  readonly menu = createMenuEngine();

  readonly routes = createRouteEngine();

  readonly navigation = createNavigationEngine();

  readonly widgets = createWidgetEngine();

  readonly layout = createLayoutEngine();

  readonly search = createSearchEngine();

  readonly notifications = createNotificationEngine();

  readonly commands = createCommandEngine();
}
