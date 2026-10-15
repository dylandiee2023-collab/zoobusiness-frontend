import type { Language } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";

type ApiEnvelope<T> = T & { message?: string };

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

function endpoint(path: string): string {
  if (!API_BASE_URL) throw new Error("API_NOT_CONFIGURED");
  return `${API_BASE_URL}/auth/${path}`;
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
    throw new Error(message || resolvePublicCopy(language, "genericError"));
  }
  return payload;
}

export async function login(email: string, password: string, language: Language) {
  return post<AuthSession>("login", { email, password }, language);
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
