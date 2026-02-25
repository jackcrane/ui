import classnames from "classnames";
import styles from "./Input.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import { useId } from "react";

export default function Input({
  variant,
  chamfer = true,
  size,
  disabled,
  label,
  ...props
}) {
  const inputId = useId();

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div
        className={classnames(
          chamfer && chamferStyles.chamfer,
          !variant && styles.pageBackground,
          styles[variant],
        )}
      >
        <input
          id={inputId}
          className={classnames(
            styles.input,
            !variant && styles.pageBackground,
            styles[variant],
            size === "large" && styles.large,
            size === "small" && styles.small,
            disabled && chamferStyles.disabled,
            disabled && styles.disabled,
            disabled && hatchStyles.hatch,
          )}
          disabled={disabled}
          style={{
            margin: -1,
            ...props.style,
          }}
          {...props}
        />
      </div>
    </div>
  );
}
