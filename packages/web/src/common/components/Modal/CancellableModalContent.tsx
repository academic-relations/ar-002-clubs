import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

interface CancellableModalContentProps {
  onClose: () => void;
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
  justify-content: space-between;
`;

const CancellableModalContent: React.FC<CancellableModalContentProps> = ({
  onClose,
  onConfirm,
  children,
}) => (
  <ModalContentInner>
    <Typography fs={16} lh={28} fw="MEDIUM" style={{ textAlign: "center" }}>
      {children}
    </Typography>
    <ButtonWrapper>
      <Button type="outlined" onClick={onClose}>
        취소
      </Button>
      <Button onClick={onConfirm}>확인</Button>
      {/* TODO: (필요시) 버튼 텍스트 수정할 수 있도록 */}
    </ButtonWrapper>
  </ModalContentInner>
);

export default CancellableModalContent;
