"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

type Lang = "vi" | "en";

type I18nContextValue = {
  lang: Lang;
  toggleLanguage: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "sunprime-lang";
const LANG_CHANGE_EVENT = "sunprime-lang-change";
const DEFAULT_LANG: Lang = "vi";

/** Dự phòng trong bộ nhớ khi localStorage không dùng được (chế độ riêng tư, bị chặn): lựa chọn vẫn có hiệu lực trong phiên. */
let sessionLang: Lang | null = null;

function readStoredLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "vi" || saved === "en") return saved;
  } catch {
    // localStorage không dùng được: dùng giá trị dự phòng bên dưới.
  }
  return sessionLang ?? DEFAULT_LANG;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LANG_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LANG_CHANGE_EVENT, onChange);
  };
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  // Server luôn render tiếng Việt; client đọc lại lựa chọn đã lưu sau khi hydrate (không lệch HTML).
  const lang = useSyncExternalStore(subscribe, readStoredLang, () => DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      toggleLanguage: () => {
        const next: Lang = lang === "vi" ? "en" : "vi";
        sessionLang = next;
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Không lưu được: lựa chọn chỉ có hiệu lực trong phiên hiện tại (sessionLang).
        }
        window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
      },
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
