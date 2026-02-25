import classNames from "classnames";
import styles from "./hatch.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

export default function Hatch({ children, className, variant, ...props }) {
  return (
    <div
      className={classNames(
        styles.hatch,
        styles[variant],
        hatchStyles.hatch,
        chamferStyles.chamfer,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
