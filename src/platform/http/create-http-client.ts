import { HttpClient } from "./http-client";

export function createHttpClient(): HttpClient {
  return new HttpClient();
}
