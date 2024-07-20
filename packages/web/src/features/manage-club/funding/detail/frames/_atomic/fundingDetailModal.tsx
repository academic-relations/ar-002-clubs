import { overlay } from "overlay-kit";

import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";

const openEditModal = () => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        onConfirm={() => {
          close();
          // TODO: 수정 로직 넣기
        }}
        onClose={close}
      >
        지원금 신청 내역을 수정하면 신청 상태가 모두 초기화 됩니다.
        <br />
        ㄱㅊ?
      </CancellableModalContent>
    </Modal>
  ));
};

const openDeleteModal = () => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        onConfirm={() => {
          close();
          // TODO: 삭제 로직 넣기
        }}
        onClose={close}
      >
        지원금 신청 내역을 삭제하면 복구할 수 없습니다.
        <br />
        ㄱㅊ?
      </CancellableModalContent>
    </Modal>
  ));
};

export { openEditModal, openDeleteModal };
