// useModal.js
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.css";
import chamferStyles from "../../general/chamfer.module.css";
import hatchStyles from "../../general/hatch.module.css";
import Button from "../Button/button";
import classNames from "classnames";

/**
 * @param {{
 *   title?: React.ReactNode
 *   content: React.ReactNode
 * }} options
 */
export const useModal = ({ title, content, footer }) => {
  const [open, setOpen] = React.useState(false);
  const modalConfigRef = React.useRef({
    open,
    setOpen,
    title,
    content,
    footer,
  });

  // eslint-disable-next-line react-hooks/refs -- Keep latest config without recreating Modal component identity.
  modalConfigRef.current = {
    open,
    setOpen,
    title,
    content,
    footer,
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
        } = modalConfigRef.current;

        return (
          <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
              <Dialog.Overlay className={`${styles.overlay} ${hatchStyles.hatch}`}>
                <div className={styles.overlayBackdrop} />
              </Dialog.Overlay>

              <Dialog.Content
                className={`${styles.content} ${chamferStyles.chamfer}`}
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
