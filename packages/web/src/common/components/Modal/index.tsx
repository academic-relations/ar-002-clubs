import React, { FC, useRef } from "react";
import styled from "styled-components";

export interface ModalProps {
  onClose?: () => void;
}

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(85, 85, 85, 0.1);

  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: max-content;
  max-width: 600px;
  max-height: 300px;

  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.round.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const ModalScrollContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
  overflow-x: hidden;

  padding: 32px;
`;

const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  onClose = () => {},
  children = <div />,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <ModalBackground
      ref={ref}
      onClick={e => {
        if (e.target !== ref.current) {
          return;
        }
        onClose();
      }}
    >
      <ModalContainer>
        <ModalScrollContainer>{children}</ModalScrollContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
