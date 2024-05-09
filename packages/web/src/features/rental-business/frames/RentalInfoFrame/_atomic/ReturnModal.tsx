import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";

interface ReturnModalContentProps {
  onCloseReturnModal: () => void;
}

const ReturnModalContent: React.FC<ReturnModalContentProps> = ({
  onCloseReturnModal,
}) => (
  <div>
    <div>
      정말로 이전 단계로 돌아가시겠습니까? 모든 입력 정보가 초기화됩니다.
    </div>
    <Button onClick={onCloseReturnModal}>확인</Button>
  </div>
);

export default ReturnModalContent;
