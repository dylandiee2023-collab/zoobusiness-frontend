export interface HttpConfig {
  baseUrl: string;

  timeout: number;

  headers: Record<string, string>;
}

export const defaultHttpConfig: HttpConfig = {
  baseUrl: import.meta.env.VITE_API_URL ?? "",

  timeout: 30000,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
