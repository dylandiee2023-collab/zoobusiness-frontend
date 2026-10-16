import type { Language } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";

type ApiEnvelope<T> = T & { message?: string };

export class AuthApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "AuthApiError";
  }
}

let refreshInFlight: Promise<AuthSession> | null = null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  refreshExpiresAt?: string;
  expiresAt?: string;
}

const configuredApiUrl = (import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL)?.replace(/\/+$/, "");

function apiUrl(path: string): string {
  if (!configuredApiUrl) throw new Error("API_NOT_CONFIGURED");
  const apiRoot = /\/api$/i.test(configuredApiUrl) ? configuredApiUrl : configuredApiUrl + "/api";
  return apiRoot + (path.startsWith("/") ? path : "/" + path);
}

function endpoint(path: string): string {
  return apiUrl("/auth/" + path);
}

async function post<T>(path: string, body: unknown, language: Language): Promise<ApiEnvelope<T>> {
  let response: Response;
  try {
    response = await fetch(endpoint(path), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept-Language": language },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(resolvePublicCopy(language, "genericError"));
  }

  const payload = (await response.json().catch(() => ({}))) as ApiEnvelope<T> & { message?: string | string[] };
  if (!response.ok) {
    const message = Array.isArray(payload.message) ? payload.message.join(" ") : payload.message;
    throw new AuthApiError(message || resolvePublicCopy(language, "genericError"), response.status);
  }
  return payload;
}

export async function login(email: string, password: string, language: Language) {
  return post<AuthSession>("login", { email, password }, language);
}

export async function refreshAuthSession(language: Language): Promise<AuthSession> {
  if (refreshInFlight) return refreshInFlight;
  const refreshToken = window.sessionStorage.getItem("zoobusiness.refreshToken");
  if (!refreshToken) throw new Error(resolvePublicCopy(language, "genericError"));
  const pending = post<AuthSession>("refresh", { refreshToken }, language)
    .then((session) => {
      saveAuthSession(session);
      return session;
    })
    .finally(() => { refreshInFlight = null; });
  refreshInFlight = pending;
  return pending;
}

export async function logout(language: Language) {
  const refreshToken = window.sessionStorage.getItem("zoobusiness.refreshToken");
  try {
    if (refreshToken) await post<{ message: string }>("logout", { refreshToken }, language);
  } finally {
    window.sessionStorage.removeItem("zoobusiness.accessToken");
    window.sessionStorage.removeItem("zoobusiness.refreshToken");
    window.sessionStorage.removeItem("zoobusiness.user");
  }
}

export async function register(name: string, email: string, password: string, language: Language) {
  return post<{ user: AuthUser }>("register", { name, email, password }, language);
}

export async function verifyEmail(email: string, code: string, language: Language) {
  return post<AuthSession>("verify-email", { email, code }, language);
}

export async function resendVerification(email: string, language: Language) {
  return post<Record<string, never>>("resend-verification", { email }, language);
}

export async function requestPasswordReset(email: string, language: Language) {
  return post<{ message: string }>("forgot-password", { email }, language);
}

export async function resetPassword(email: string, code: string, password: string, language: Language) {
  return post<{ message: string }>("reset-password", { email, code, password }, language);
}

async function authorizedRequest<T>(
  path: string,
  method: "GET" | "POST",
  body: unknown,
  language: Language,
): Promise<T> {
  if (!configuredApiUrl) throw new Error("API_NOT_CONFIGURED");
  const requestUrl = apiUrl(path);
  const makeInit = (token: string | null): RequestInit => ({
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
  });
  let response: Response;
  try {
    response = await fetch(requestUrl, makeInit(window.sessionStorage.getItem("zoobusiness.accessToken")));
  } catch {
    throw new Error(resolvePublicCopy(language, "genericError"));
  }
  if (response.status === 401 && window.sessionStorage.getItem("zoobusiness.refreshToken")) {
    try {
      const refreshed = await refreshAuthSession(language);
      response = await fetch(requestUrl, makeInit(refreshed.accessToken));
    } catch {
      window.sessionStorage.removeItem("zoobusiness.accessToken");
      window.sessionStorage.removeItem("zoobusiness.refreshToken");
      window.sessionStorage.removeItem("zoobusiness.user");
      throw new Error(resolvePublicCopy(language, "genericError"));
    }
  }
  const payload = (await response.json().catch(() => ({}))) as T & { message?: string | string[] };
  if (!response.ok) {
    if (response.status === 401) {
      window.sessionStorage.removeItem("zoobusiness.accessToken");
      window.sessionStorage.removeItem("zoobusiness.refreshToken");
      window.sessionStorage.removeItem("zoobusiness.user");
    }
    const message = Array.isArray(payload.message) ? payload.message.join(" ") : payload.message;
    throw new AuthApiError(message || resolvePublicCopy(language, "genericError"), response.status);
  }
  return payload;
}

export interface BusinessCategory {
  id: string;
  name: string;
  description?: string | null;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  business_category_id?: string | null;
}

export async function getBusinessCategories(language: Language) {
  return authorizedRequest<BusinessCategory[]>("/business-categories", "GET", undefined, language);
}

export interface WorkspaceAccess {
  workspaceId: string;
  role: string;
  permissions: string[];
}

export async function getCurrentWorkspaceAccess(language: Language) {
  return authorizedRequest<WorkspaceAccess>("/workspaces/current/access", "GET", undefined, language);
}

export async function getCurrentWorkspace(language: Language) {
  return authorizedRequest<Workspace>("/workspaces/current", "GET", undefined, language);
}

export async function createWorkspace(name: string, slug: string, language: Language) {
  return authorizedRequest<Workspace>("/workspaces", "POST", { name, slug }, language);
}

export async function completeBusinessSetup(
  workspaceId: string,
  data: {
    businessCategoryId: string;
    description?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
  },
  language: Language,
) {
  return authorizedRequest<Workspace>(
    `/workspaces/${encodeURIComponent(workspaceId)}/complete-setup`,
    "POST",
    data,
    language,
  );
}

export function saveAuthSession(session: AuthSession) {
  window.sessionStorage.setItem("zoobusiness.accessToken", session.accessToken);
  window.sessionStorage.setItem("zoobusiness.refreshToken", session.refreshToken);
  window.sessionStorage.setItem("zoobusiness.user", JSON.stringify(session.user));
}

export function authErrorMessage(error: unknown, language: Language): string {
  if (error instanceof Error && error.message === "API_NOT_CONFIGURED") {
    return resolvePublicCopy(language, "apiNotConfigured");
  }
  return error instanceof Error ? error.message : resolvePublicCopy(language, "genericError");
}


export function passwordPolicyError(password: string, language: Language): string | null {
  if (password.length < 12) {
    return language === "sw"
      ? "Nenosiri liwe na angalau herufi 12."
      : "Password must contain at least 12 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return language === "sw"
      ? "Ongeza angalau herufi moja kubwa (A–Z)."
      : "Password must contain at least one uppercase letter (A–Z).";
  }
  if (!/[a-z]/.test(password)) {
    return language === "sw"
      ? "Ongeza angalau herufi moja ndogo (a–z)."
      : "Password must contain at least one lowercase letter (a–z).";
  }
  if (!/[0-9]/.test(password)) {
    return language === "sw"
      ? "Ongeza angalau namba moja (0–9)."
      : "Password must contain at least one number (0–9).";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return language === "sw"
      ? "Ongeza angalau alama moja maalum, kama ! au @."
      : "Password must contain at least one special character, such as ! or @.";
  }
  return null;
}
