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

  const Modal = () => (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.overlay} ${hatchStyles.hatch}`}>
          <div className={styles.overlayBackdrop} />
        </Dialog.Overlay>

        <Dialog.Content
          className={`${styles.content} ${chamferStyles.chamfer}`}
        >
          {title && (
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
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              <Dialog.Close asChild>
                <Button size="small" variant="danger">
                  Close
                </Button>
              </Dialog.Close>
            </div>
          )}

          <div className={styles.body}>{content}</div>

          {footer && (
            <div className={classNames(styles.footer, hatchStyles.hatch)}>
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

  const trigger = (node) => <Dialog.Trigger asChild>{node}</Dialog.Trigger>;

  return { Modal, trigger, open, setOpen };
};
