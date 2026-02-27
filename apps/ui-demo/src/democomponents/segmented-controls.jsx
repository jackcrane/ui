import { useState } from "react";
import { SegmentedControl } from "@jackcrane/ui";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  gap: 4,
  alignItems: "center",
  flexWrap: "wrap",
};

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const variants = [
  undefined,
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
  "info",
];

export const SegmentedControls = () => {
  const [variantValue, setVariantValue] = useState("week");
  const [sizeValue, setSizeValue] = useState("week");
  const [flatValue, setFlatValue] = useState("week");
  const [allowEmptyValue, setAllowEmptyValue] = useState("month");

  return (
    <div>
      <h2>Segmented Controls</h2>

      <h3>Variants</h3>
      <div style={rowStyle}>
        {variants.map((variant) => (
          <SegmentedControl
            key={variant ?? "default"}
            aria-label={`${variant ?? "default"} segmented control`}
            options={options}
            value={variantValue}
            onValueChange={setVariantValue}
            variant={variant}
          />
        ))}
      </div>

      <h3>Sizes</h3>
      <div style={rowStyle}>
        <SegmentedControl
          aria-label="Large segmented control"
          options={options}
          value={sizeValue}
          onValueChange={setSizeValue}
          size="large"
        />
        <SegmentedControl
          aria-label="Default segmented control"
          options={options}
          value={sizeValue}
          onValueChange={setSizeValue}
        />
        <SegmentedControl
          aria-label="Small segmented control"
          options={options}
          value={sizeValue}
          onValueChange={setSizeValue}
          size="small"
        />
      </div>

      <h3>Disabled</h3>
      <div style={rowStyle}>
        <SegmentedControl
          aria-label="Disabled segmented control"
          options={options}
          value="week"
          disabled
        />
        <SegmentedControl
          aria-label="Disabled primary segmented control"
          options={options}
          value="week"
          variant="primary"
          disabled
        />
      </div>

      <h3>No Chamfer</h3>
      <div style={rowStyle}>
        <SegmentedControl
          aria-label="Flat segmented control"
          options={options}
          value={flatValue}
          onValueChange={setFlatValue}
          chamfer={false}
        />
        <SegmentedControl
          aria-label="Flat primary segmented control"
          options={options}
          value={flatValue}
          onValueChange={setFlatValue}
          variant="primary"
          chamfer={false}
        />
      </div>

      <h3>Allow Empty</h3>
      <div style={rowStyle}>
        <SegmentedControl
          aria-label="Allow empty segmented control"
          options={options}
          value={allowEmptyValue}
          onValueChange={setAllowEmptyValue}
          allowEmpty
        />
      </div>
    </div>
  );
};
