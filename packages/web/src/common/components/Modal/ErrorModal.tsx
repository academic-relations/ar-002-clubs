import React from "react";

import { overlay } from "overlay-kit";

import ConfirmModalContent from "./ConfirmModalContent";

import Modal from ".";

export interface ErrorModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  message?: string;
}

export const errorHandler = (message?: string) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <ConfirmModalContent onConfirm={close}>
        {message ?? "실패하였습니다"}
      </ConfirmModalContent>
    </Modal>
  ));
};

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onConfirm,
  message = "실패하였습니다",
}) => (
  <Modal isOpen={isOpen}>
    <ConfirmModalContent onConfirm={onConfirm}>{message}</ConfirmModalContent>
  </Modal>
);

export default ErrorModal;
