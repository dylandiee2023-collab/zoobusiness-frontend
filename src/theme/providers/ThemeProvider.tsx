import { useCallback, useEffect, useMemo, useState } from "react";

import { ThemeContext } from "@/theme/context";
import {
  resolveInitialTheme,
  resolveTheme,
} from "@/theme/resolver";
import { saveTheme } from "@/theme/storage";
import { watchSystemTheme } from "@/theme/system";
import type {
  ThemeMode,
  ThemeProviderProps,
} from "@/theme/types";
import {
  applyCssVariables,
  createCssVariables,
} from "@/theme/utils";

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() =>
    resolveInitialTheme(),
  );

  const theme = useMemo(
    () => resolveTheme(mode),
    [mode],
  );

  useEffect(() => {
    applyCssVariables(createCssVariables(theme));

    document.documentElement.dataset.theme = mode;
  }, [theme, mode]);

  useEffect(() => {
    if (mode !== "system") {
      return;
    }

    const unsubscribe = watchSystemTheme(() => {
      const systemTheme = resolveTheme("system");

      applyCssVariables(
        createCssVariables(systemTheme),
      );
    });

    return unsubscribe;
  }, [mode]);

  const changeTheme = useCallback(
    (nextMode: ThemeMode) => {
      saveTheme(nextMode);
      setMode(nextMode);
    },
    [],
  );

  const toggleMode = useCallback(() => {
    const nextMode: ThemeMode =
      mode === "dark" ? "light" : "dark";

    saveTheme(nextMode);
    setMode(nextMode);
  }, [mode]);

  const value = useMemo(
    () => ({
      theme,
      mode,
      setMode: changeTheme,
      toggleMode,
    }),
    [theme, mode, changeTheme, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}