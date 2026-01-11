import Select from "../components/Select/select";

export const Selects = () => {
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
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="primary"
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="secondary"
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="success"
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="warning"
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="danger"
        />
        <Select
          options={[
            { value: "1", label: "Item 1" },
            { value: "2", label: "Item 2" },
            { value: "3", label: "Item 3" },
            { value: "4", label: "Item 4" },
            { value: "5", label: "Item 5" },
          ]}
          value="1"
          onValueChange={(value) => {
            console.log(value);
          }}
          variant="info"
        />
      </div>
    </div>
  );
};
