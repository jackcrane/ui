import { Dropdown } from "@jcui/ui-kit";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";

const BASE_ITEMS = [
  {
    key: "settings",
    value: "settings",
    label: "Settings",
    icon: <IconSettings />,
  },
  {
    key: "switch",
    value: "switch",
    label: "Switch accounts",
    icon: <IconUser />,
  },
  { type: "separator" },
  { key: "logout", value: "logout", label: "Log out", icon: <IconLogout /> },
];

export const Dropdowns = () => {
  const handleMenuAction = (value, item) => {
    console.log("menu action", value, item);
  };

  return (
    <div>
      <h2>Dropdowns</h2>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
        />
      </div>
    </div>
  );
};
