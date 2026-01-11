import Button from "../components/Button/button";

export const Buttons = () => {
  return (
    <div>
      <h2>Buttons</h2>
      <Button>Hello</Button>

      <h3>Sizes</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Button size="large">Large</Button>
        <Button>Default</Button>
        <Button size="small">Small</Button>
      </div>

      <h3>Disabled</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Button disabled>Disabled</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>

      <h3>Variants</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
      </div>

      <h3>No Chamfer</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button chamfer={false}>Default</Button>
        <Button variant="primary" chamfer={false}>
          Primary
        </Button>
        <Button variant="secondary" chamfer={false}>
          Secondary
        </Button>
        <Button variant="success" chamfer={false}>
          Success
        </Button>
        <Button variant="warning" chamfer={false}>
          Warning
        </Button>
        <Button variant="danger" chamfer={false}>
          Danger
        </Button>
        <Button variant="info" chamfer={false}>
          Info
        </Button>
      </div>
    </div>
  );
};
