// useModal.js
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import Button from "../Button/button";
import classNames from "classnames";

const MODAL_WIDTHS = {
  sm: 420,
  md: 640,
  lg: 840,
};

const DEFAULT_MODAL_SIZE = "md";

const resolveModalWidth = (size) => {
  if (typeof size === "number" && Number.isFinite(size) && size > 0) {
    return size;
  }

  if (typeof size === "string") {
    if (size in MODAL_WIDTHS) {
      return MODAL_WIDTHS[size];
    }

    const parsed = Number(size);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return MODAL_WIDTHS[DEFAULT_MODAL_SIZE];
};

/**
 * @param {{
 *   title?: React.ReactNode
 *   content: React.ReactNode
 *   footer?: React.ReactNode
 *   size?: "sm" | "md" | "lg" | number
 * }} options
 */
export const useModal = ({ title, content, footer, size = DEFAULT_MODAL_SIZE }) => {
  const [open, setOpen] = React.useState(false);
  const modalConfigRef = React.useRef({
    open,
    setOpen,
    title,
    content,
    footer,
    size,
  });

  modalConfigRef.current = {
    open,
    setOpen,
    title,
    content,
    footer,
    size,
  };

  const Modal = React.useMemo(
    () =>
      function Modal() {
        const {
          open: isOpen,
          setOpen: onOpenChange,
          title: currentTitle,
          content: currentContent,
          footer: currentFooter,
          size: currentSize,
        } = modalConfigRef.current;
        const modalWidth = resolveModalWidth(currentSize);
        const [isMobileLayout, setIsMobileLayout] = React.useState(false);

        React.useEffect(() => {
          if (typeof window === "undefined") {
            return undefined;
          }

          const updateMobileLayout = () => {
            setIsMobileLayout(window.innerWidth <= modalWidth + 20);
          };

          updateMobileLayout();
          window.addEventListener("resize", updateMobileLayout);

          return () => {
            window.removeEventListener("resize", updateMobileLayout);
          };
        }, [modalWidth]);

        return (
          <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
              <Dialog.Overlay className={`${styles.overlay} ${hatchStyles.hatch}`}>
                <div className={styles.overlayBackdrop} />
              </Dialog.Overlay>

              <Dialog.Content
                className={classNames(
                  styles.content,
                  chamferStyles.chamfer,
                  isMobileLayout && styles.mobileContent,
                )}
                style={{ "--jcui-modal-width": `${modalWidth}px` }}
              >
                {currentTitle && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: -12,
                      marginBottom: 0,
                      padding: 12,
                      borderBottom:
                        "var(--border-thickness) solid var(--border-color)",
                    }}
                    className={classNames(hatchStyles.hatch)}
                  >
                    <Dialog.Title className={styles.title}>
                      {currentTitle}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <Button size="small" variant="danger">
                        Close
                      </Button>
                    </Dialog.Close>
                  </div>
                )}

                <div className={styles.body}>{currentContent}</div>

                {currentFooter && (
                  <div className={classNames(styles.footer, hatchStyles.hatch)}>
                    {currentFooter}
                  </div>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        );
      },
    [],
  );

  const trigger = (node) => <Dialog.Trigger asChild>{node}</Dialog.Trigger>;

  return { Modal, trigger, open, setOpen };
};
