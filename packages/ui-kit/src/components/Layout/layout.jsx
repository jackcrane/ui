import styles from "./layout.module.css";
import classNames from "classnames";
import hatchStyles from "../../general/hatch.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <nav className={classNames(styles.topnav, hatchStyles.hatch)}>
        <img
          src="https://raw.githubusercontent.com/jackcrane/jackstack/refs/heads/main/app/assets/logotype.svg"
          className={styles.logo}
        />
      </nav>
      <div className={styles.content}>
        <nav className={styles.sidenav}></nav>
        <div>{children}</div>
      </div>
    </div>
  );
};
