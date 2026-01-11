import { useEffect, useMemo, useState } from "react";
import dark from "./dark.module.css";
import light from "./light.module.css";
import global from "./global.module.css";
import classnames from "classnames";
import { DEFAULT_THEME, ThemeContext } from "./theme-context";

export const JCUIProvider = ({
  children,
  theme: initialTheme = DEFAULT_THEME,
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
      </div>
    </ThemeContext.Provider>
  );
};
