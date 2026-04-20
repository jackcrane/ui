import { useEffect, useMemo, useRef, useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import global from "./global.module.css";
import classnames from "classnames";
import { DEFAULT_THEME, ThemeContext } from "./theme-context";
import { Toaster } from "react-hot-toast";
import toastStyles from "../Toast/toast.module.css";

const THEME_COOKIE_NAME = "jcui-theme";
const VALID_THEMES = new Set(["light", "dark"]);

const readThemeCookie = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${THEME_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  const value = decodeURIComponent(cookie.split("=")[1] ?? "");
  return VALID_THEMES.has(value) ? value : null;
};

const writeThemeCookie = (theme) => {
  if (typeof document === "undefined" || !VALID_THEMES.has(theme)) {
    return;
  }

  document.cookie = `${THEME_COOKIE_NAME}=${encodeURIComponent(theme)}; path=/; max-age=31536000; SameSite=Lax`;
};

export const JCUIProvider = ({
  children,
  theme: initialTheme = DEFAULT_THEME,
  modalMobileBreakpoint = 600,
  className,
  ...props
}) => {
  const [theme, setTheme] = useState(() => readThemeCookie() ?? initialTheme);
  const previousInitialThemeRef = useRef(initialTheme);
  const themeClass = theme === "dark" ? dark.dark : light.light;
  const globalClass = global.global;

  useEffect(() => {
    if (previousInitialThemeRef.current === initialTheme) {
      return;
    }

    previousInitialThemeRef.current = initialTheme;
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    writeThemeCookie(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const body = document.body;
    body.classList.add(themeClass, globalClass);

    return () => {
      body.classList.remove(themeClass, globalClass);
    };
  }, [themeClass, globalClass]);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return undefined;
    }

    const body = document.body;
    const parsedBreakpoint = Number(modalMobileBreakpoint);
    const breakpoint =
      Number.isFinite(parsedBreakpoint) && parsedBreakpoint > 0
        ? parsedBreakpoint
        : 600;

    const updateModalMobileState = () => {
      const isMobile = window.innerWidth <= breakpoint;
      body.classList.toggle("jcui-modal-mobile", isMobile);
      body.style.setProperty("--jcui-modal-mobile-breakpoint", `${breakpoint}px`);
    };

    updateModalMobileState();
    window.addEventListener("resize", updateModalMobileState);

    return () => {
      window.removeEventListener("resize", updateModalMobileState);
      body.classList.remove("jcui-modal-mobile");
      body.style.removeProperty("--jcui-modal-mobile-breakpoint");
    };
  }, [modalMobileBreakpoint]);

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={classnames(
          themeClass,
          globalClass,
          "jcui-provider",
          className
        )}
        {...props}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            blank: { duration: 4200 },
            custom: { duration: 4200 },
          }}
          limit={4}
          gutter={10}
          containerClassName={toastStyles.toastViewport}
        />
      </div>
    </ThemeContext.Provider>
  );
};
