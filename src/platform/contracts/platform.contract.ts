import type { BootstrapContract } from "./bootstrap.contract";
import type { RuntimeContract } from "./runtime.contract";
import type { EnvironmentContract } from "./environment.contract";
import type { ConfigurationContract } from "./configuration.contract";
import type { LoggerContract } from "./logger.contract";
import type { EventBusContract } from "./event-bus.contract";
import type { StorageContract } from "./storage.contract";
import type { PreferencesContract } from "./preferences.contract";
import type { SessionContract } from "./session.contract";
import type { HttpClientContract } from "./http.contract";
import type { ApiClientContract } from "./api.contract";
import type { AuthenticationContract } from "./authentication.contract";
import type { TokenManagerContract } from "./token-manager.contract";
import type { CacheContract } from "./cache.contract";
import type { TelemetryContract } from "./telemetry.contract";
import type { UploadContract } from "./upload.contract";
import type { DownloadContract } from "./download.contract";
import type { ThemeEngineContract } from "./theme-engine.contract";
import type { ResponsiveEngineContract } from "./responsive-engine.contract";
import type { IconEngineContract } from "./icon-engine.contract";
import type { PermissionEngineContract } from "./permission-engine.contract";
import type { MenuEngineContract } from "./menu-engine.contract";
import type { RouteEngineContract } from "./route-engine.contract";
import type { NavigationEngineContract } from "./navigation-engine.contract";
import type { WidgetEngineContract } from "./widget-engine.contract";
import type { LayoutEngineContract } from "./layout-engine.contract";
import type { SearchEngineContract } from "./search-engine.contract";
import type { NotificationEngineContract } from "./notification-engine.contract";
import type { CommandEngineContract } from "./command-engine.contract";

export interface PlatformContract {
  readonly bootstrap: BootstrapContract;

  readonly runtime: RuntimeContract;

  readonly environment: EnvironmentContract;

  readonly configuration: ConfigurationContract;

  readonly logger: LoggerContract;

  readonly events: EventBusContract;

  readonly storage: StorageContract;

  readonly preferences: PreferencesContract;

  readonly session: SessionContract;

  readonly http: HttpClientContract;

  readonly api: ApiClientContract;

  readonly authentication: AuthenticationContract;

  readonly tokens: TokenManagerContract;

  readonly cache: CacheContract;

  readonly telemetry: TelemetryContract;

  readonly upload: UploadContract;

  readonly download: DownloadContract;

  readonly theme: ThemeEngineContract;

  readonly responsive: ResponsiveEngineContract;

  readonly icons: IconEngineContract;

  readonly permissions: PermissionEngineContract;

  readonly menu: MenuEngineContract;

  readonly routes: RouteEngineContract;

  readonly navigation: NavigationEngineContract;

  readonly widgets: WidgetEngineContract;

  readonly layout: LayoutEngineContract;

  readonly search: SearchEngineContract;

  readonly notifications: NotificationEngineContract;

  readonly commands: CommandEngineContract;
}