import dark from "./dark.module.css";
import light from "./light.module.css";
import global from "./global.module.css";
import classnames from "classnames";

export const JCUIProvider = ({ children, theme, className, ...props }) => {
  return (
    <div
      className={classnames(
        theme === "dark" ? dark.dark : light.light,
        global.global,
        "jcui-provider",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
