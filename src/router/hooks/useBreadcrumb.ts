import { useLocation } from "react-router-dom";

export function useBreadcrumb() {
  const { pathname } = useLocation();

  return pathname
    .split("/")
    .filter(Boolean);
}