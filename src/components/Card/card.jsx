import classnames from "classnames";
import styles from "./card.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

export default function Card({
  children,
  variant,
  chamfer = true,
  size,
  footerHeight = 0,
  ...props
}) {
  return (
    <div
      className={classnames(
        styles.card,
        styles[variant],
        chamfer && chamferStyles.chamfer,
        size === "large" && styles.large,
        size === "small" && styles.small
      )}
      {...props}
    >
      {props.title && (
        <div className={classnames(styles.title, hatchStyles.hatch)}>
          {props.title}
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footerHeight > 0 && (
        <div
          className={classnames(hatchStyles.hatch, styles.footer)}
          style={{ flexBasis: footerHeight }}
        />
      )}
    </div>
  );
}
