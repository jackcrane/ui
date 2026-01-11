import { RadioGroup, Radio } from "../components/Radio/radio";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
  flexWrap: "wrap",
};

const variants = [
  undefined,
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
];

export const Radios = () => (
  <div>
    <h2>Radio Buttons</h2>

    <h3>Variants</h3>
    <div style={rowStyle}>
      {variants.map((variant) => (
        <RadioGroup
          key={variant ?? "default"}
          defaultValue={`${variant ?? "default"}-variant`}
          aria-label={`${variant ?? "default"} variant`}
        >
          <Radio
            value={`${variant ?? "default"}-variant`}
            label={variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : "Default"}
            variant={variant}
          />
        </RadioGroup>
      ))}
    </div>

    <h3>Sizes</h3>
    <div style={rowStyle}>
      <RadioGroup defaultValue="large-size" aria-label="Sizes">
        <Radio value="large-size" label="Large" size="large" />
        <Radio value="default-size" label="Default" />
        <Radio value="small-size" label="Small" size="small" />
      </RadioGroup>
    </div>

    <h3>Disabled</h3>
    <div style={rowStyle}>
      <RadioGroup defaultValue="disabled-one" aria-label="Disabled">
        <Radio value="disabled-one" label="Disabled" disabled />
        <Radio value="disabled-two" label="Primary" variant="primary" disabled />
      </RadioGroup>
    </div>

    <h3>No Chamfer</h3>
    <div style={rowStyle}>
      <RadioGroup defaultValue="no-chamfer" aria-label="No chamfer">
        <Radio value="no-chamfer" label="Flat" chamfer={false} />
      </RadioGroup>
      <RadioGroup defaultValue="no-chamfer-primary" aria-label="No chamfer primary">
        <Radio value="no-chamfer-primary" label="Primary" variant="primary" chamfer={false} />
      </RadioGroup>
    </div>
  </div>
);
