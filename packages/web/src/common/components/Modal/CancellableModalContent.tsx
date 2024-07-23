import React from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";

import FlexWrapper from "../FlexWrapper";
import Typography from "../Typography";

interface CancellableModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  closeButtonText?: string;
  confirmButtonText?: string;
  children: React.ReactNode;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancellableModalContent: React.FC<CancellableModalContentProps> = ({
  onClose,
  onConfirm,
  children,
  closeButtonText = "취소",
  confirmButtonText = "확인",
}) => (
  <FlexWrapper direction="column" gap={12}>
    <Typography fs={16} lh={28} fw="MEDIUM" style={{ textAlign: "center" }}>
      {children}
    </Typography>
    <ButtonWrapper>
      <Button type="outlined" onClick={onClose}>
        {closeButtonText}
      </Button>
      <Button onClick={onConfirm}>{confirmButtonText}</Button>
    </ButtonWrapper>
  </FlexWrapper>
);

export default CancellableModalContent;
