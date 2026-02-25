import { useState } from "react";
import { Button, Input, useModal } from "@jackcrane/ui";

export const Modals = () => {
  const [modalInputValue, setModalInputValue] = useState("");

  const { Modal, setOpen } = useModal({
    title: <>Delete item?</>,
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

  return (
    <>
      <h2>Modals</h2>
      <Modal />
      <Button onClick={() => setOpen(true)}>Programmatic open</Button>
    </>
  );
};
