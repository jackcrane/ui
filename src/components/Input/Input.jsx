import classnames from "classnames";
import styles from "./Input.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

export default function Input({
  variant,
  chamfer = true,
  size,
  disabled,
  ...props
}) {
  return (
    <div
      className={classnames(chamfer && chamferStyles.chamfer, styles[variant])}
    >
      <input
        className={classnames(
          styles.input,
          styles[variant],
          size === "large" && styles.large,
          size === "small" && styles.small,
          disabled && chamferStyles.disabled,
          disabled && styles.disabled,
          disabled && hatchStyles.hatch
        )}
        disabled={disabled}
        style={{
          margin: -1,
          ...props.style,
        }}
        {...props}
      />
    </div>
  );
}
