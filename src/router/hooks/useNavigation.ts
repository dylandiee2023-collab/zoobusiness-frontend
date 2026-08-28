import { useLocation, useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const location = useLocation();

  return {
    navigate,
    pathname: location.pathname,
  };
}
