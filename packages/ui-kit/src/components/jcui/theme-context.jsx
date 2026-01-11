import { createContext, useContext } from "react";

export const DEFAULT_THEME = "light";

export const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export const useJCUITheme = () => useContext(ThemeContext);
