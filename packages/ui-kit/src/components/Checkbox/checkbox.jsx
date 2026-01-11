import clsx from "clsx";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import styles from "./checkbox.module.css";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" role="presentation">
    <polyline
      points="5 13 10 18 19 7"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Checkbox({
  children,
  label,
  variant,
  chamfer = true,
  size,
  disabled,
  className,
  ...props
}) {
  const labelContent = label ?? children;
  const variantClass = variant && styles[variant];
  const sizeClass =
    size === "large" ? styles.large : size === "small" ? styles.small : null;

  return (
    <label
      className={clsx(styles.wrapper, variantClass, disabled && styles.disabled)}
    >
      <RadixCheckbox.Root
        className={clsx(
          styles.root,
          variantClass,
          sizeClass,
          chamfer && chamferStyles.chamfer,
          disabled && chamferStyles.disabled,
          disabled && hatchStyles.hatch,
          disabled && styles.disabledBox,
          className
        )}
        disabled={disabled}
        {...props}
      >
        <RadixCheckbox.Indicator className={styles.indicator}>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {labelContent && <span className={styles.label}>{labelContent}</span>}
    </label>
  );
}
