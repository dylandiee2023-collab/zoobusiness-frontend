export interface ResponsiveEngineContract {
  readonly mobile: boolean;

  readonly tablet: boolean;

  readonly laptop: boolean;

  readonly desktop: boolean;

  readonly width: number;

  readonly height: number;
}