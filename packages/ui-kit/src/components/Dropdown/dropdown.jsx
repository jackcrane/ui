import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import styles from "./dropdown.module.css";
import { Loader } from "../Loader/loader";

/**
 * @typedef DropdownItem
 * @type {object}
 * @property {string} [key]
 * @property {import("react").ReactNode} label
 * @property {string} [value]
 * @property {boolean} [disabled]
 * @property {import("react").ReactNode} [icon]
 * @property {() => void} [onSelect]
 * @property {"item" | "separator"} [type]
 */

/**
 * Dropdown menu that matches the rest of the JC/UI kit treatment.
 *
 * @param {Object} props
 * @param {DropdownItem[]} [props.items]
 * @param {import("react").ReactNode} [props.trigger]
 * @param {import("react").ReactNode} [props.triggerLabel]
 * @param {string} [props.variant]
 * @param {string} [props.size]
 * @param {boolean} [props.chamfer]
 * @param {boolean} [props.disabled]
 * @param {string} [props.align]
 * @param {string} [props.side]
 * @param {(value: string | undefined, item: DropdownItem) => void} [props.onItemSelect]
 */
export default function Dropdown({
  items = [],
  trigger,
  triggerLabel = "Menu",
  variant,
  size,
  chamfer = true,
  disabled,
  align = "start",
  side = "bottom",
  onItemSelect,
  showArrow = true,
  triggerProps,
  contentProps,
  loading,
  ...props
}) {
  const triggerClassName = clsx(
    styles.trigger,
    variant && styles[variant],
    chamfer && chamferStyles.chamfer,
    size === "large" && styles.large,
    size === "small" && styles.small,
    disabled && styles.disabled,
    disabled && hatchStyles.hatch
  );

  const contentClassName = clsx(
    styles.content,
    variant && styles[variant],
    chamfer && chamferStyles.chamfer
  );

  const handleItemSelect = (item) => {
    item.onSelect?.(item.value);
    onItemSelect?.(item.value, item);
  };

  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger
        className={triggerClassName}
        disabled={disabled || loading}
        {...triggerProps}
      >
        {trigger ?? <span>{triggerLabel}</span>}
        {showArrow && !loading && "▾"}
        {loading && <Loader />}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={contentClassName}
          align={align}
          side={side}
          sideOffset={0}
          {...contentProps}
        >
          <div className={styles.viewport}>
            {items.map((item, index) => {
              if (item.type === "separator") {
                const separatorKey = item.key ?? `separator-${index}`;
                return (
                  <DropdownMenu.Separator
                    key={separatorKey}
                    className={styles.separator}
                  />
                );
              }

              const itemKey =
                item.key ??
                item.value ??
                (typeof item.label === "string"
                  ? `${item.label}-${index}`
                  : `item-${index}`);

              return (
                <DropdownMenu.Item
                  key={itemKey}
                  onSelect={() => handleItemSelect(item)}
                  disabled={item.disabled}
                  className={styles.item}
                >
                  {item.icon && (
                    <span className={styles.itemIcon} aria-hidden>
                      {item.icon}
                    </span>
                  )}
                  <span className={styles.itemLabel}>{item.label}</span>
                </DropdownMenu.Item>
              );
            })}
          </div>
          <DropdownMenu.Arrow className={styles.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
