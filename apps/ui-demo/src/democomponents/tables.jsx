import { Table } from "@jackcrane/ui";

const rows = [
  {
    name: "Nebula",
    stage: "Design",
    owner: "Avery",
    velocity: 12,
    status: "Exploring",
  },
  {
    name: "Relay",
    stage: "Build",
    owner: "Sage",
    velocity: 27,
    status: "Shipping",
  },
  {
    name: "Beacon",
    stage: "QA",
    owner: "Mina",
    velocity: 18,
    status: "Validating",
  },
  {
    name: "Atlas",
    stage: "Scale",
    owner: "Noah",
    velocity: 34,
    status: "Stable",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: "Project",
    cell: (info) => <strong>{info.getValue()}</strong>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "velocity",
    header: "Velocity",
    cell: (info) => `${info.getValue()} pts`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const Tables = () => {
  return (
    <>
      <h2>Tables</h2>
      <p style={{ marginTop: 0 }}>
        First pass on a TanStack-backed table with local sorting and the same
        chamfered, token-driven surface treatment as the rest of the kit.
      </p>
      <Table
        columns={columns}
        data={rows}
        variant="secondary"
      />
    </>
  );
};
