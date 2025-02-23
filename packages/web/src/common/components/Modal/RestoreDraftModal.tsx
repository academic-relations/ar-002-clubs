import React from "react";

import Typography from "../Typography";
import Modal from ".";
import CancellableModalContent from "./CancellableModalContent";

interface RestoreDraftModalProps {
  isOpen: boolean;
  mainText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const RestoreDraftModal: React.FC<RestoreDraftModalProps> = ({
  isOpen,
  mainText = undefined,
  onConfirm,
  onClose,
}) => (
  <Modal isOpen={isOpen}>
    <CancellableModalContent
      confirmButtonText="불러오기"
      closeButtonText="새로 작성하기"
      onConfirm={onConfirm}
      onClose={onClose}
    >
      {mainText ?? `임시 저장된 데이터가 있습니다. 불러오시겠습니까?`}
      <Typography color="GRAY.600" fs={12} lh={16} fw="REGULAR">
        ‘새로 작성하기’를 선택하면 기존 임시 저장된 데이터가 삭제됩니다. 임시
        저장 된 데이터는 24시간 후 자동 삭제됩니다.
      </Typography>
    </CancellableModalContent>
  </Modal>
);

export default RestoreDraftModal;
