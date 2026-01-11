import { Card } from "@jcui/ui-kit";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const Cards = () => {
  return (
    <div>
      <h2>Cards</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          "default",
          "primary",
          "secondary",
          "success",
          "warning",
          "danger",
          "info",
        ].map((variant) => (
          <Card
            key={variant}
            variant={variant}
            style={{ width: 200 }}
            title={capitalize(variant)}
          >
            A {variant} card
          </Card>
        ))}
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
        <Card size="large">Large</Card>
        <Card>Default</Card>
        <Card size="small">Small</Card>
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
        <Card chamfer={false}>Default</Card>
        <Card variant="primary" chamfer={false}>
          Primary
        </Card>
        <Card variant="secondary" chamfer={false}>
          Secondary
        </Card>
        <Card variant="success" chamfer={false}>
          Success
        </Card>
        <Card variant="warning" chamfer={false}>
          Warning
        </Card>
        <Card variant="danger" chamfer={false}>
          Danger
        </Card>
        <Card variant="info" chamfer={false}>
          Info
        </Card>
      </div>

      <h3>Footer</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Card footerHeight={40}>A card with a footer</Card>
        <Card footerHeight={40} variant={"primary"}>
          A card with a footer
        </Card>
      </div>
    </div>
  );
};
