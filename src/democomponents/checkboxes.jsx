import Checkbox from "../components/Checkbox/checkbox";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
  flexWrap: "wrap",
};

export const Checkboxes = () => {
  return (
    <div>
      <h2>Checkboxes</h2>

      <h3>Variants</h3>
      <div style={rowStyle}>
        <Checkbox>Default</Checkbox>
        <Checkbox variant="primary" defaultChecked>
          Primary
        </Checkbox>
        <Checkbox variant="secondary">Secondary</Checkbox>
        <Checkbox variant="success" defaultChecked>
          Success
        </Checkbox>
        <Checkbox variant="warning">Warning</Checkbox>
        <Checkbox variant="danger" defaultChecked>
          Danger
        </Checkbox>
        <Checkbox variant="info">Info</Checkbox>
      </div>

      <h3>Sizes</h3>
      <div style={rowStyle}>
        <Checkbox size="large" defaultChecked>
          Large
        </Checkbox>
        <Checkbox defaultChecked>Default</Checkbox>
        <Checkbox size="small">Small</Checkbox>
      </div>

      <h3>Disabled</h3>
      <div style={rowStyle}>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox disabled defaultChecked variant="primary">
          Primary
        </Checkbox>
        <Checkbox disabled variant="success">
          Success
        </Checkbox>
      </div>

      <h3>No Chamfer</h3>
      <div style={rowStyle}>
        <Checkbox chamfer={false}>Flat</Checkbox>
        <Checkbox chamfer={false} variant="warning" defaultChecked>
          Warning
        </Checkbox>
      </div>
    </div>
  );
};
