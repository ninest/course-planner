import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { ReactNode } from "react";

interface ModalProps {
  trigger?: ReactNode;
  children: ReactNode;
  open?: boolean;
}

export const Modal = ({ trigger, children, open = false }: ModalProps) => {
  return (
    <Dialog.Root open={open}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Overlay className=" fixed m-0 inset-0 z-20 bg-black/50 backdrop-blur-sm" />
      <Dialog.Portal>
        <Dialog.Content
          className={clsx(
            "fixed z-50",
            "top-0 w-full p-6 pb-9 rounded-b-lg",
            "md:rounded-3xl shadow md:p-10 md:top-[10%] md:w-[50vw] md:max-w-lg  md:left-[50%] md:-translate-x-[50%]",
            "bg-white focus:outline-none "
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const ModalTitle = ({ children }: { children: ReactNode }) => (
  <Dialog.Title>{children}</Dialog.Title>
);

export const ModalDescription = ({ children }: { children: ReactNode }) => (
  <Dialog.Title>{children}</Dialog.Title>
);

export const ModalClose = ({ children }: { children: ReactNode }) => (
  <Dialog.Close asChild>{children}</Dialog.Close>
);
