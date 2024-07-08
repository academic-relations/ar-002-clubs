import { overlay } from "overlay-kit";

import styled from "styled-components";

import Button from "../Button";

import Modal from ".";

const ModalBody = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ModalExample = () => {
  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <ModalBody>
          <div>신청이 완료되었습니다.</div>
          <div style={{ width: 400, height: 800, backgroundColor: "gray" }} />
          <Button onClick={close}>확인</Button>
        </ModalBody>
      </Modal>
    ));
  };
  return <Button onClick={submitHandler}>오픈 모달</Button>;
};

export default ModalExample;
