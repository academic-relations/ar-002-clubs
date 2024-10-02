import { overlay } from "overlay-kit";

import ConfirmModalContent from "./ConfirmModalContent";

import Modal from ".";

export const errorHandler = (message?: string) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <ConfirmModalContent onConfirm={close}>
        {message ?? "실패하였습니다"}
      </ConfirmModalContent>
    </Modal>
  ));
};
