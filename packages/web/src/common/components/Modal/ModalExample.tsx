import React, { useState } from "react";
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)}>
          <ModalBody>
            <div>신청이 완료되었습니다.</div>
            <div style={{ width: 400, height: 800, backgroundColor: "gray" }} />
            <Button onClick={() => setModalVisible(false)}>확인</Button>
          </ModalBody>
        </Modal>
      )}
      <Button onClick={() => setModalVisible(!modalVisible)}>오픈 모달</Button>
    </>
  );
};

export default ModalExample;
