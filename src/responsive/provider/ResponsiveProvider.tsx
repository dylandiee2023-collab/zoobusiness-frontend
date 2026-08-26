import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ResponsiveContext } from "../context/ResponsiveContext";
import { ResponsiveService } from "../services/ResponsiveService";

interface Props {
  children: ReactNode;
}

export function ResponsiveProvider({ children }: Props) {
  const [state, setState] = useState(() =>
    ResponsiveService.getState()
  );

  useEffect(() => {
    const handleResize = () => {
      setState(ResponsiveService.getState());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
}