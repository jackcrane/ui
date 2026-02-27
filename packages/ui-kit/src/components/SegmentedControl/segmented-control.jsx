import clsx from "clsx";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";
import hatchStyles from "../../general/hatch.module.css";
import styles from "./segmented-control.module.css";

/**
 * SegmentedControl component.
 *
 * @param {Object} props
 * @param {Array<{ value: string, label: React.ReactNode, disabled?: boolean }>} props.options
 * @param {string} props.value
 * @param {string} props.defaultValue
 * @param {(value: string) => void} props.onValueChange
 * @param {boolean} props.allowEmpty
 * @param {string} props.variant
 * @param {string} props.size
 * @param {boolean} props.disabled
 * @param {boolean} props.chamfer
 * @param {string} props.className
 * @param {string} props.itemClassName
 * @returns {JSX.Element}
 */
export default function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onValueChange,
  allowEmpty = false,
  variant,
  size,
  disabled,
  chamfer = true,
  className,
  itemClassName,
  ...props
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = isControlled ? value : internalValue;

  return (
    <RadixToggleGroup.Root
      type="single"
      value={selectedValue}
      onValueChange={(nextValue) => {
        if (!allowEmpty && !nextValue) {
          return;
        }
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
      }}
      disabled={disabled}
      className={clsx(
        styles.root,
        styles[variant],
        chamfer && styles.chamferEnabled,
        size === "large" && styles.large,
        size === "small" && styles.small,
        disabled && hatchStyles.hatch,
        disabled && styles.disabled,
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <RadixToggleGroup.Item
          key={option.value}
          value={option.value}
          disabled={disabled || option.disabled}
          className={clsx(
            styles.item,
            (disabled || option.disabled) && styles.itemDisabled,
            itemClassName
          )}
        >
          {option.label}
        </RadixToggleGroup.Item>
      ))}
    </RadixToggleGroup.Root>
  );
}
