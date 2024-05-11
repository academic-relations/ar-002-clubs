import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

interface ConfirmModalContentProps {
  onConfirm: () => void;
  confirmButtonText?: string;
  children: React.ReactNode;
}

const ModalContentInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ConfirmModalContent: React.FC<ConfirmModalContentProps> = ({
  onConfirm,
  children,
  confirmButtonText = "확인",
}) => (
  <ModalContentInner>
    <Typography fs={16} lh={28} fw="MEDIUM" style={{ textAlign: "center" }}>
      {children}
    </Typography>
    <ButtonWrapper>
      <Button onClick={onConfirm}>{confirmButtonText}</Button>
    </ButtonWrapper>
  </ModalContentInner>
);

export default ConfirmModalContent;
