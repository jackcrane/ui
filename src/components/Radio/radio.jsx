import clsx from "clsx";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import styles from "./radio.module.css";

export const RadioGroup = ({ className, children, ...props }) => (
  <RadixRadioGroup.Root
    className={clsx(styles.group, className)}
    {...props}
  >
    {children}
  </RadixRadioGroup.Root>
);

export function Radio({
  value,
  label,
  variant,
  chamfer = true,
  size,
  disabled,
  className,
  ...props
}) {
  const variantClass = variant && styles[variant];
  const sizeClass =
    size === "large" ? styles.large : size === "small" ? styles.small : null;

  return (
    <label
      className={clsx(styles.wrapper, variantClass, disabled && styles.disabled)}
    >
      <RadixRadioGroup.Item
        className={clsx(
          styles.root,
          variantClass,
          sizeClass,
          chamfer && chamferStyles.chamfer,
          disabled && chamferStyles.disabled,
          disabled && hatchStyles.hatch,
          disabled && styles.disabledDot,
          className
        )}
        value={value}
        disabled={disabled}
        {...props}
      >
        <RadixRadioGroup.Indicator className={styles.indicator}>
          <span className={styles.dot} />
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
