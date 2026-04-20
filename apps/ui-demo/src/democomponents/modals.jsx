import { useState } from "react";
import { Button, Input, useModal } from "@jackcrane/ui";

const modalSizes = [
  { label: "Open small", value: "sm" },
  { label: "Open medium", value: "md" },
  { label: "Open large", value: "lg" },
  { label: "Open 720px", value: 720 },
];

export const Modals = () => {
  const [modalInputValue, setModalInputValue] = useState("");
  const [modalSize, setModalSize] = useState("md");

  const { Modal, setOpen } = useModal({
    title: <>Delete item?</>,
    size: modalSize,
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0 }}>
          Regression test: type in the input below. Every keystroke updates
          state, but the modal should stay steady and not replay the enter
          animation.
        </p>
        <Input
          type="text"
          placeholder="Type here"
          value={modalInputValue}
          onChange={(event) => setModalInputValue(event.target.value)}
        />
        <p style={{ margin: 0 }}>
          Current value: <strong>{modalInputValue || "empty"}</strong>
        </p>
      </div>
    ),
    footer: <Button variant="primary">Continue</Button>,
  });

  const openModalWithSize = (size) => {
    setModalSize(size);
    setOpen(true);
  };

  return (
    <>
      <h2>Modals</h2>
      <Modal />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {modalSizes.map(({ label, value }) => (
          <Button key={label} onClick={() => openModalWithSize(value)}>
            {label}
          </Button>
        ))}
      </div>
    </>
  );
};
