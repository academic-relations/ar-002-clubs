import Button from "@sparcs-clubs/web/common/components/Button";
import React from "react";

interface AssignModalContentProps {
  onCloseAssignModal: () => void;
}

const ReturnModalContent: React.FC<AssignModalContentProps> = ({
  onCloseAssignModal,
}) => (
  <div>
    <div>신청하시겠습니까? 신청 후에는 수정이 불가능합니다.</div>
    <Button onClick={onCloseAssignModal}>확인</Button>
  </div>
);

export default ReturnModalContent;
