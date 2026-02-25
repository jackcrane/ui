import { Button, toast } from "@jcui/ui-kit";

const VARIANTS = [
  { label: "Default", action: () => toast("Default notification") },
  {
    label: "Primary",
    action: () => toast.primary("Primary toast"),
  },
  {
    label: "Success",
    action: () => toast.success("Success toast"),
  },
  {
    label: "Warning",
    action: () => toast.warning("Warning toast"),
  },
  {
    label: "Danger",
    action: () => toast.danger("Danger toast"),
  },
  {
    label: "Info",
    action: () => toast.info("Info toast"),
  },
];

const showActionToast = () => {
  toast.secondary("Action toast?");
};

const showLoadingToast = () => {
  let timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2200);
  });

  toast.promise(timeoutPromise, {
    loading: "Uploading…",
    success: "Upload complete",
    error: "Upload failed",
  });
};

export const Toasts = () => {
  return (
    <div>
      <h2>Toasts</h2>
      <p>Use the buttons to trigger the chamfered toast experience.</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: "0.5rem",
          alignItems: "center",
        }}
      >
        {VARIANTS.map(({ label, action }) => (
          <Button key={label} onClick={action}>
            {label}
          </Button>
        ))}
        <Button variant="secondary" onClick={showActionToast}>
          Action
        </Button>
        <Button variant="info" onClick={showLoadingToast}>
          Loading
        </Button>
        <Button variant="danger" onClick={() => toast.removeAll()}>
          Clear
        </Button>
      </div>
    </div>
  );
};
