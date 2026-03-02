import classnames from "classnames";
import styles from "./card.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

export default function Card({
  children,
  variant,
  chamfer = true,
  size,
  collapsed,
  onCollapseChange,
  footerHeight = 0,
  footer, // I hardly know her
  title,
  ...props
}) {
  const isCollapsible = collapsed !== undefined;
  const isCollapsed = Boolean(collapsed);

  const handleCollapseToggle = () => {
    if (!isCollapsible) {
      return;
    }

    onCollapseChange?.(!isCollapsed);
  };

  const handleKeyDown = (event) => {
    if (!isCollapsible) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCollapseToggle();
    }
  };

  return (
    <div
      className={classnames(
        styles.card,
        !variant && styles.pageBackground,
        styles[variant],
        chamfer && chamferStyles.chamfer,
        size === "large" && styles.large,
        size === "small" && styles.small,
      )}
      {...props}
    >
      {(title || isCollapsible) && (
        <div
          className={classnames(
            styles.title,
            hatchStyles.hatch,
            isCollapsed && styles.titleCollapsed,
            isCollapsible && styles.titleInteractive,
          )}
          onClick={isCollapsible ? handleCollapseToggle : undefined}
          onKeyDown={isCollapsible ? handleKeyDown : undefined}
          role={isCollapsible ? "button" : undefined}
          tabIndex={isCollapsible ? 0 : undefined}
          aria-expanded={isCollapsible ? !isCollapsed : undefined}
          aria-label={isCollapsible ? (isCollapsed ? "Expand card" : "Collapse card") : undefined}
        >
          <div className={styles.titleContent}>
            {title}
            {isCollapsible && (
              <span
                aria-hidden="true"
                className={classnames(
                  styles.chevron,
                  isCollapsed ? styles.chevronCollapsed : styles.chevronExpanded,
                )}
              />
            )}
          </div>
        </div>
      )}
      <div
        className={classnames(styles.content, isCollapsed && styles.contentCollapsed)}
      >
        <div className={styles.contentInner}>
          <div className={styles.body}>{children}</div>
          {footerHeight > 0 && (
            <div
              className={classnames(hatchStyles.hatch, styles.footer)}
              style={{ flexBasis: footerHeight }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
