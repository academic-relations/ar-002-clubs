import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import FlexWrapper from "../FlexWrapper";

interface ConfirmModalContentProps {
  onConfirm: () => void;
  confirmButtonText?: string;
  children: React.ReactNode;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ConfirmModalContent: React.FC<ConfirmModalContentProps> = ({
  onConfirm,
  children,
  confirmButtonText = "확인",
}) => (
  <FlexWrapper direction="column" gap={12}>
    <Typography fs={16} lh={28} fw="MEDIUM" style={{ textAlign: "center" }}>
      {children}
    </Typography>
    <ButtonWrapper>
      <Button onClick={onConfirm}>{confirmButtonText}</Button>
    </ButtonWrapper>
  </FlexWrapper>
);

export default ConfirmModalContent;
