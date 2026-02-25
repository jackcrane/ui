import { useState } from "react";
import { FileUpload } from "@jackcrane/ui";

const formatToKb = (size) => {
  if (typeof size !== "number" || Number.isNaN(size)) {
    return "Unknown size";
  }

  return `${Math.max(1, Math.round(size / 1024))} KB`;
};

const summarizeNames = (files) => {
  if (!files.length) {
    return "None";
  }

  return files.map((file) => file?.name ?? "Unnamed file").join(", ");
};

export const FileUploads = () => {
  const [singleFiles, setSingleFiles] = useState([]);
  const [assetFiles, setAssetFiles] = useState([]);
  const [lastNativeCount, setLastNativeCount] = useState(0);

  return (
    <div>
      <h2>File Uploads</h2>
      <p style={{ marginTop: -8, opacity: 0.8, maxWidth: 760 }}>
        Wrapper over native <code>input[type=file]</code> with click and
        drag-and-drop support. Native props and events still pass through.
      </p>

      <div style={{ display: "grid", gap: 14, maxWidth: 760 }}>
        <FileUpload
          label="Single file"
          placeholder="Choose a profile image"
          helperText="Accepts one image file via click or drag-and-drop."
          accept="image/*"
          onFilesChange={setSingleFiles}
          onChange={(event) => {
            setLastNativeCount(event.target.files?.length ?? 0);
          }}
        />

        <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          Selected: <strong>{singleFiles[0]?.name ?? "None"}</strong> · Last
          native onChange count: <strong>{lastNativeCount}</strong>
        </div>

        <FileUpload
          label="Multiple files"
          placeholder="Drop release assets"
          helperText="Multiple upload mode with image previews where available."
          multiple
          variant="primary"
          accept=".png,.jpg,.jpeg,.pdf,.zip"
          onFilesChange={setAssetFiles}
        />

        <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          Files: <strong>{summarizeNames(assetFiles)}</strong>
        </div>

        <FileUpload
          label="No chamfer + custom renderer"
          placeholder="Upload documents"
          helperText="Custom file item rendering while still using native file input events."
          multiple
          variant="info"
          chamfer={false}
          renderFile={(file, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                border: "var(--border-thickness) solid var(--border-color)",
                padding: "0.45rem 0.625rem",
                background: "var(--body-bg)",
              }}
            >
              <span style={{ fontSize: "0.825rem" }}>
                {index + 1}. {file?.name ?? "Unknown file"}
              </span>
              <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>
                {formatToKb(file?.size)}
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
};
