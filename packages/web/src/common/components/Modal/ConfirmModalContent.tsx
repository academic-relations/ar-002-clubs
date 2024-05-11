import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

interface ConfirmModalContentProps {
  onConfirm: () => void;
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
}) => (
  <ModalContentInner>
    <Typography fs={16} lh={28} fw="MEDIUM" style={{ textAlign: "center" }}>
      {children}
    </Typography>
    <ButtonWrapper>
      <Button onClick={onConfirm}>확인</Button>
      {/* TODO: (필요시) 버튼 텍스트 수정할 수 있도록 */}
    </ButtonWrapper>
  </ModalContentInner>
);

export default ConfirmModalContent;
