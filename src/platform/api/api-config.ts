export interface ApiConfig {
  baseUrl: string;

  timeout: number;

  headers: Record<string, string>;
}

const developmentApiUrl = "http://localhost:5000/api";

export const defaultApiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL ?? developmentApiUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
