import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { LanguageContext } from "./language-context";

export type Language = "en" | "sw";

const STORAGE_KEY = "zoobusiness.language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "sw" ? "sw" : "en";
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (next: Language) => setLanguageState(next);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
