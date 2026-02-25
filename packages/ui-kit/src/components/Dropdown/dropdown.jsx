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
 * @property {(value: string | undefined) => void} [onSelect]
 * @property {(event: Event) => void} [onClick]
 * @property {string} [href]
 * @property {string} [target]
 * @property {string} [rel]
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
  triggerClassName: _triggerClassName,
  ...props
}) {
  const triggerClassName = clsx(
    styles.trigger,
    variant && styles[variant],
    chamfer && chamferStyles.chamfer,
    size === "large" && styles.large,
    size === "small" && styles.small,
    disabled && styles.disabled,
    disabled && hatchStyles.hatch,
    _triggerClassName
  );

  const contentClassName = clsx(
    styles.content,
    variant && styles[variant],
    chamfer && chamferStyles.chamfer
  );

  const handleItemSelect = (item, event) => {
    item.onClick?.(event);
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

              const itemContent = (
                <>
                  {item.icon && (
                    <span className={styles.itemIcon} aria-hidden>
                      {item.icon}
                    </span>
                  )}
                  <span className={styles.itemLabel}>{item.label}</span>
                </>
              );

              if (item.href && !item.disabled) {
                return (
                  <DropdownMenu.Item
                    key={itemKey}
                    asChild
                    onSelect={(event) => handleItemSelect(item, event)}
                    className={styles.item}
                  >
                    <a href={item.href} target={item.target} rel={item.rel}>
                      {itemContent}
                    </a>
                  </DropdownMenu.Item>
                );
              }

              return (
                <DropdownMenu.Item
                  key={itemKey}
                  onSelect={(event) => handleItemSelect(item, event)}
                  disabled={item.disabled}
                  className={styles.item}
                >
                  {itemContent}
                </DropdownMenu.Item>
              );
            })}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
