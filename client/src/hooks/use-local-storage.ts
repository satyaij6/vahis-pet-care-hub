import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    } catch (err) {
      console.error(err);
      return typeof initialValue === "function"
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      // dispatch local change event so same-tab components can respond as well
      try {
        const detail = { key, value: JSON.stringify(state) };
        window.dispatchEvent(new CustomEvent("local-storage", { detail } as any));
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error(err);
    }
  }, [key, state]);

  // listen for external changes (other tabs/windows) as well as same-tab custom events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        if (e.newValue) setState(JSON.parse(e.newValue) as T);
      } catch (err) {
        console.error(err);
      }
    };
    const handleCustom = (e: Event) => {
      const d: any = (e as CustomEvent).detail;
      if (!d || d.key !== key) return;
      try {
        const newValue = JSON.parse(d.value) as T;
        setState((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(newValue)) {
            return prev;
          }
          return newValue;
        });
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleCustom as EventListener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleCustom as EventListener);
    };
  }, [key]);

  return [state, setState] as const;
}
