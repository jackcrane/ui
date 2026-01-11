import { Select } from "radix-ui";
import clsx from "clsx";
import styles from "./select.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import classNames from "classnames";
import { Loader } from "../Loader/loader";

/**
 * Select component.
 *
 * @param {Object} props
 * @param {Array<{ value: string, label: string, disabled?: boolean }>} props.options
 * @param {string} props.value
 * @param {(value: string) => void} props.onValueChange
 * @param {string} props.variant
 * @param {string} props.size
 * @param {boolean} props.disabled
 */
export default function SelectInput({
  options,
  value,
  onValueChange,
  variant,
  size,
  disabled,
  chamfer = true,
  loading = false,
}) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <Select.Trigger
        className={clsx(
          styles.trigger,
          styles[variant],
          chamfer && chamferStyles.chamfer,
          size === "large" && styles.large,
          size === "small" && styles.small,
          disabled && styles.disabled,
          disabled && hatchStyles.hatch
          // loading && styles.disabled
        )}
      >
        <Select.Value />
        {loading ? (
          <Loader />
        ) : (
          <Select.Icon className={styles.icon}>▾</Select.Icon>
        )}
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={classNames(
            styles.content,
            chamfer && chamferStyles.chamfer
          )}
          sideOffset={6}
        >
          <Select.Viewport>
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className={styles.item}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
