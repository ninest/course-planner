import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { HTMLProps, ReactNode } from "react";

interface ModalProps {
  trigger?: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Modal = ({
  trigger,
  children,
  open = false,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
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

export const ModalTitle = ({
  children,
  className,
}: HTMLProps<HTMLTitleElement>) => (
  <Dialog.Title className={className}>{children}</Dialog.Title>
);

export const ModalDescription = ({ children }: { children: ReactNode }) => (
  <Dialog.Description>{children}</Dialog.Description>
);

export const ModalClose = ({ children }: { children: ReactNode }) => (
  <Dialog.Close asChild>{children}</Dialog.Close>
);
