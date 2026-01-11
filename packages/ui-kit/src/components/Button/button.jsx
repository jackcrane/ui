import clsx from "clsx";
import styles from "./button.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import { useJCUITheme } from "../jcui/theme-context";
import { Loader } from "../Loader/loader";

/**
 * Button component.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content rendered inside the button.
 * @param {string} props.variant - Visual style variant key used to resolve CSS module classes.
 * @param {boolean} props.chamfer - Whether to apply a chamfer effect to the button.
 * @param {string} props.size - Size of the button. Either large or small. Defaults to medium.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @returns {JSX.Element}
 */
export default function Button({
  children,
  variant,
  chamfer = true,
  size,
  disabled,
  loading,
  ...props
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        chamfer && chamferStyles.chamfer,
        size === "large" && styles.large,
        size === "small" && styles.small,
        disabled && chamferStyles.disabled,
        disabled && hatchStyles.hatch,
        disabled && styles.disabled
      )}
      disabled={disabled}
      {...props}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "0.5rem",
        }}
      >
        <div>{children}</div>
        {loading && <Loader />}
      </div>
    </button>
  );
}

export const ColorSwitcher = () => {
  const { theme, setTheme } = useJCUITheme();
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 100,
      }}
    >
      <Button
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? "Dark" : "Light"} mode
      </Button>
    </div>
  );
};
