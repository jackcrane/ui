import styles from "./layout.module.css";
import classNames from "classnames";
import hatchStyles from "../../general/hatch.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import { useState } from "react";
import {
  Icon2fa,
  Icon3dCubeSphere,
  IconAlienFilled,
  IconDatabase,
  IconHeart,
  IconHome,
  IconSend,
} from "@tabler/icons-react";
import Dropdown from "../Dropdown/dropdown";

const sidenavItems = [
  {
    type: "item",
    label: "Home",
    href: "#",
    icon: <IconHome color="var(--primary-color)" />,
  },
  {
    type: "section",
    label: "Section 1",
    items: [
      {
        type: "item",
        label: "Item 1",
        href: "#",
        icon: <IconSend color="var(--danger-color)" />,
      },
      {
        type: "item",
        label: "Item 2",
        href: "#",
        icon: <Icon2fa color="var(--success-color)" />,
      },
      {
        type: "section",
        label: "Item 3",
        icon: <Icon3dCubeSphere color="var(--warning-color)" />,
        items: [
          {
            type: "item",
            label: "Item 3.1",
            href: "#",
            icon: <IconHeart color="var(--info-color)" />,
          },
          {
            type: "item",
            label: "Item 3.2",
            href: "#",
            focus: true,
            icon: <IconAlienFilled color="var(--secondary-color)" />,
          },
        ],
      },
      {
        type: "item",
        label: "Item 4",
        href: "#",
        icon: <IconDatabase color="var(--danger-color)" />,
      },
    ],
  },
  {
    type: "item",
    label: "Item 5",
    href: "#",
    icon: <IconSend color="var(--danger-color)" />,
  },
  {
    type: "grow",
  },
  {
    type: "dropdown",
    label: "Icons",
    icon: <Icon2fa color="var(--success-color)" />,
    items: [
      { type: "item", label: "Home", href: "#" },
      { type: "item", label: "Settings", href: "#" },
      { type: "item", label: "Logout", href: "#" },
    ],
  },
];

const hasActive = (item) => {
  if (item.type === "item") return !!item.focus;
  if (item.items) return item.items.some(hasActive);
  return false;
};

const SidenavGeneric = ({ item }) => {
  if (item.type === "grow") return <SidenavGrow />;
  return (
    <div
      key={item.label}
      className={classNames(
        styles.sidenavItem,
        styles[item.type],
        item.focus && hatchStyles.hatch,
        item.focus && styles.focus
      )}
    >
      {item.type === "item" && <SidenavItem item={item} />}
      {item.type === "section" && <SidenavSection item={item} />}
      {item.type === "dropdown" && <SidenavDropdown item={item} />}
    </div>
  );
};

const SidenavItem = ({ item }) => {
  return (
    <a
      href={item.href}
      className={classNames(
        styles.sidenavLink,
        chamferStyles.chamfer,
        chamferStyles.chamferOnHover
      )}
    >
      {item.icon && <div className={styles.sidenavIcon}>{item.icon}</div>}
      {item.label}
    </a>
  );
};

const SidenavSection = ({ item }) => {
  const containsActive = hasActive(item);
  const [open, setOpen] = useState(containsActive);

  // keep section in sync if active changes
  if (containsActive && !open) setOpen(true);

  return (
    <div className={styles.sidenavSection}>
      <div
        className={styles.sidenavSectionLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{item.label}</span>
        <span
          className={classNames(
            styles.sidenavSectionTrigger,
            open && styles.open
          )}
        >
          ▾
        </span>
      </div>

      <div
        className={classNames(styles.sidenavSectionItems, open && styles.open)}
      >
        {item.items.map((child) => (
          <SidenavGeneric key={child.label} item={child} />
        ))}
      </div>
    </div>
  );
};

const SidenavDropdown = ({ item }) => {
  return (
    <Dropdown
      items={item.items}
      onItemSelect={(value, item) => {
        console.log("item", value, item);
      }}
      triggerLabel={
        <div className={styles.sidenavLink} style={{ padding: 0, margin: 0 }}>
          {item.icon}
          {item.label}
        </div>
      }
      chamfer={false}
      triggerClassName={styles.sidenavDropdown}
    />
  );
};

const SidenavGrow = () => {
  return <div style={{ flex: 1 }}></div>;
};

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
        <nav className={styles.sidenav}>
          {sidenavItems.map((item) => (
            <SidenavGeneric item={item} />
          ))}
        </nav>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};
