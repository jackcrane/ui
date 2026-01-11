import { Select } from "radix-ui";
import clsx from "clsx";
import styles from "./select.module.css";
import chamferStyles from "../../general/chamfer.module.css";

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
  variant = "secondary",
  size,
  disabled,
  chamfer = true,
}) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={clsx(
          styles.trigger,
          styles[variant],
          chamfer && chamferStyles.chamfer,
          size === "large" && styles.large,
          size === "small" && styles.small,
          disabled && styles.disabled
        )}
      >
        <Select.Value />
        <Select.Icon className={styles.icon}>▾</Select.Icon>
      </Select.Trigger>

      <Select.Portal
        container={document.getElementsByClassName("jcui-provider")[0]}
      >
        <Select.Content className={styles.content} sideOffset={6}>
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
