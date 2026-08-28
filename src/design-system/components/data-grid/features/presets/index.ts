export interface DataGridPreset {
  id: string;

  name: string;

  columns: string[];

  pageSize: number;

  density: "compact" | "comfortable" | "spacious";
}

export function createPreset(preset: DataGridPreset): DataGridPreset {
  return preset;
}
