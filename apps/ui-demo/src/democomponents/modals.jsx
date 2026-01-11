import { Button, useModal } from "@jcui/ui-kit";

export const Modals = () => {
  const { Modal, setOpen } = useModal({
    title: <>Delete item?</>,
    content: (
      <iframe
        src="https://docs.featurebench.com/p/preventing-plagarism/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
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
