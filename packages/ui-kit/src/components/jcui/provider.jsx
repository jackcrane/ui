import { useEffect, useMemo, useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import global from "./global.module.css";
import classnames from "classnames";
import { DEFAULT_THEME, ThemeContext } from "./theme-context";
import { Toaster } from "react-hot-toast";
import toastStyles from "../Toast/toast.module.css";

export const JCUIProvider = ({
  children,
  theme: initialTheme = DEFAULT_THEME,
  modalMobileBreakpoint = 600,
  className,
  ...props
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const themeClass = theme === "dark" ? dark.dark : light.light;
  const globalClass = global.global;

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

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
