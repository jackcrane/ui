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

      <h3>No chamfer</h3>
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
          chamfer={false}
        />
      </div>

      <h3>Variants</h3>
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
          variant="primary"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          variant="success"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          variant="warning"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          variant="danger"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          variant="info"
        />
      </div>

      <h3>Sizes</h3>
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
          size="large"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          size="small"
        />
      </div>

      <h3>Disabled</h3>
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
          disabled
        />
        <Dropdown
          items={BASE_ITEMS}
          onItemSelect={handleMenuAction}
          triggerLabel="Account"
          disabled
          variant="primary"
        />
      </div>

      <h3>Loading</h3>
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
          loading
        />
      </div>
    </div>
  );
};
