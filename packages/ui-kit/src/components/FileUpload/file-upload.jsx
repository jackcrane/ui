import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./file-upload.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";

const normalizeFiles = (value, multiple = false) => {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return [value];
  }

  const normalized = Array.isArray(value)
    ? value.filter(Boolean)
    : typeof value?.length === "number" ||
        typeof value?.[Symbol.iterator] === "function"
      ? Array.from(value).filter(Boolean)
      : [value];

  return multiple ? normalized : normalized.slice(0, 1);
};

const formatFileSize = (size) => {
  if (typeof size !== "number" || Number.isNaN(size)) {
    return null;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const isImageFile = (file) => {
  if (typeof File === "undefined") {
    return false;
  }

  return file instanceof File && typeof file.type === "string"
    ? file.type.startsWith("image/")
    : false;
};

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" role="presentation" aria-hidden>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9l5 -5l5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4l0 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" role="presentation" aria-hidden>
    <path
      d="M8 3.5H14.5L19.5 8.5V20.5H8C6.9 20.5 6 19.6 6 18.5V5.5C6 4.4 6.9 3.5 8 3.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M14.5 3.5V8.5H19.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M9.5 12H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.5 15H14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const FileUpload = forwardRef(function FileUpload(
  {
    label,
    helperText,
    placeholder = "Click to upload or drag and drop",
    dropHint,
    icon,
    files,
    onFilesChange,
    renderFile,
    showFileList = true,
    className,
    dropzoneClassName,
    variant,
    size,
    chamfer = true,
    disabled,
    id: providedId,
    children,
    ...inputProps
  },
  ref,
) {
  const autoId = useId();
  const inputId = providedId ?? `file-upload-${autoId}`;
  const inputRef = useRef(null);
  const dragCounterRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [internalFiles, setInternalFiles] = useState([]);

  const multiple = Boolean(inputProps.multiple);
  const controlledFiles = useMemo(
    () => normalizeFiles(files, multiple),
    [files, multiple],
  );
  const selectedFiles = files === undefined ? internalFiles : controlledFiles;

  const previewItems = useMemo(
    () =>
      selectedFiles.map((file, index) => {
        const name =
          typeof file?.name === "string" && file.name.length > 0
            ? file.name
            : `File ${index + 1}`;

        return {
          file,
          name,
          previewUrl: isImageFile(file) ? URL.createObjectURL(file) : null,
          sizeText: formatFileSize(file?.size),
        };
      }),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      previewItems.forEach(({ previewUrl }) => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      });
    };
  }, [previewItems]);

  const setInputNode = (node) => {
    inputRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const commitFiles = (nextFiles, event) => {
    if (files === undefined) {
      setInternalFiles(nextFiles);
    }

    onFilesChange?.(nextFiles, event);
  };

  const handleInputChange = (event) => {
    const nextFiles = normalizeFiles(event.target.files, multiple);
    commitFiles(nextFiles, event);
    inputProps.onChange?.(event);
  };

  const syncDroppedFilesToInput = (droppedFiles, dropEvent) => {
    const inputNode = inputRef.current;

    if (!inputNode) {
      commitFiles(droppedFiles, dropEvent);
      return;
    }

    if (typeof DataTransfer !== "undefined") {
      try {
        const transfer = new DataTransfer();
        droppedFiles.forEach((file) => transfer.items.add(file));
        inputNode.files = transfer.files;
        inputNode.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      } catch {
        // Fallback below when files assignment is unavailable.
      }
    }

    commitFiles(droppedFiles, dropEvent);
  };

  const handleDropzoneClick = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleDropzoneKeyDown = (event) => {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputProps.onDragEnter?.(event);

    if (disabled || !event.dataTransfer?.types?.includes("Files")) {
      return;
    }

    dragCounterRef.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputProps.onDragOver?.(event);

    if (disabled) {
      return;
    }

    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputProps.onDragLeave?.(event);

    if (disabled) {
      return;
    }

    dragCounterRef.current -= 1;

    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    inputProps.onDrop?.(event);

    dragCounterRef.current = 0;
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const nextFiles = normalizeFiles(event.dataTransfer?.files, multiple);

    if (nextFiles.length === 0) {
      return;
    }

    syncDroppedFilesToInput(nextFiles, event);
  };

  const hintText =
    dropHint ??
    (multiple
      ? "Drop files here or click to add more."
      : "Drop a file here or click to browse.");

  const selectedSummary =
    selectedFiles.length > 0
      ? `${selectedFiles.length} file${selectedFiles.length === 1 ? "" : "s"} selected`
      : placeholder;

  const dropzoneIcon = icon ?? <UploadIcon />;
  const fileFallbackIcon = icon ?? <FileIcon />;

  return (
    <div className={clsx(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.dropzone,
          !variant && styles.pageBackground,
          variant && styles[variant],
          chamfer && chamferStyles.chamfer,
          size === "large" && styles.large,
          size === "small" && styles.small,
          disabled && styles.disabled,
          disabled && chamferStyles.disabled,
          disabled && hatchStyles.hatch,
          isDragging && styles.dragging,
          selectedFiles.length > 0 && styles.hasFiles,
          dropzoneClassName,
        )}
        onClick={handleDropzoneClick}
        onKeyDown={handleDropzoneKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
      >
        <input
          ref={setInputNode}
          id={inputId}
          className={styles.input}
          type="file"
          disabled={disabled}
          {...inputProps}
          onChange={handleInputChange}
        />

        <div className={styles.dropzoneContent}>
          <span className={styles.dropzoneIcon} aria-hidden>
            {dropzoneIcon}
          </span>
          <span className={styles.dropzoneText}>
            <span className={styles.dropzoneTitle}>{selectedSummary}</span>
            <span className={styles.dropzoneHint}>{hintText}</span>
          </span>
        </div>

        {children}
      </div>

      {helperText && <p className={styles.helperText}>{helperText}</p>}

      {showFileList && selectedFiles.length > 0 && (
        <div className={styles.fileList}>
          {previewItems.map((item, index) => {
            if (renderFile) {
              return (
                <div key={`${item.name}-${index}`} className={styles.customFile}>
                  {renderFile(item.file, index)}
                </div>
              );
            }

            return (
              <div key={`${item.name}-${index}`} className={styles.fileItem}>
                <span className={styles.filePreview} aria-hidden>
                  {item.previewUrl ? (
                    <img
                      className={styles.filePreviewImage}
                      src={item.previewUrl}
                      alt=""
                    />
                  ) : (
                    fileFallbackIcon
                  )}
                </span>

                <span className={styles.fileMeta}>
                  <span className={styles.fileName}>{item.name}</span>
                  {item.sizeText && (
                    <span className={styles.fileSize}>{item.sizeText}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default FileUpload;
