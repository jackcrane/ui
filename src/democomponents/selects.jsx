import { useState } from "react";
import Select from "../components/Select/select";

const OPTIONS = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
  { value: "4", label: "Item 4" },
  { value: "5", label: "Item 5" },
];

export const Selects = () => {
  const [value, setValue] = useState("1");

  const onValueChange = (nextValue) => {
    setValue(nextValue);
    console.log(nextValue);
  };

  return (
    <div>
      <h2>Selects</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Select options={OPTIONS} value={value} onValueChange={onValueChange} />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="primary"
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="secondary"
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="success"
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="warning"
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="danger"
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="info"
        />
      </div>

      <h3>Sizes</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          size="large"
        />
        <Select options={OPTIONS} value={value} onValueChange={onValueChange} />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          size="small"
        />
      </div>

      <h3>Disabled</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          disabled
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="primary"
          disabled
        />
      </div>

      <h3>Loading</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          loading
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="primary"
          loading
        />
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
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="primary"
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="secondary"
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="success"
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="warning"
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="danger"
          chamfer={false}
        />
        <Select
          options={OPTIONS}
          value={value}
          onValueChange={onValueChange}
          variant="info"
          chamfer={false}
        />
      </div>
    </div>
  );
};
