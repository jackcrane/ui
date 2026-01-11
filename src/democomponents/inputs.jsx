import Input from "../components/Input/Input";

export const Inputs = () => {
  return (
    <div>
      <h2>Inputs</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Input type="text" placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="date" placeholder="Date" />
        <Input type="datetime-local" placeholder="Datetime" />
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
        <Input type="text" placeholder="Large" size="large" />
        <Input type="text" placeholder="Default" />
        <Input type="text" placeholder="Small" size="small" />
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
        <Input type="text" placeholder="Disabled" disabled />
        <Input type="text" placeholder="Disabled" variant="primary" disabled />
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
        <Input type="text" placeholder="Default" />
        <Input type="text" placeholder="Primary" variant="primary" />
        <Input type="text" placeholder="Secondary" variant="secondary" />
        <Input type="text" placeholder="Success" variant="success" />
        <Input type="text" placeholder="Warning" variant="warning" />
        <Input type="text" placeholder="Danger" variant="danger" />
        <Input type="text" placeholder="Info" variant="info" />
      </div>
    </div>
  );
};
