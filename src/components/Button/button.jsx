import clsx from "clsx";
import styles from "./button.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

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
      {children}
    </button>
  );
}
