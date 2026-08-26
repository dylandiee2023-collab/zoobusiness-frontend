export interface ApiConfig {
  baseUrl: string;

  timeout: number;

  headers: Record<string, string>;
}

export const defaultApiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL ?? "",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};