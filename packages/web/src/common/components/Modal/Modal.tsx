import React, { FC, useRef } from "react";
import styled from "styled-components";

export interface ModalProps {
  onClose?: () => void;
}

const ModalBlockBackground = styled.div`
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

const ModalBlockContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: auto;
  overflow-x: hidden;

  height: max-content;
  max-width: 600px;
  max-height: 300px;

  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.round.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const Modal: FC<React.PropsWithChildren<ModalProps>> = ({
  onClose = () => {},
  children = <div>{}</div>,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <ModalBlockBackground
      ref={ref}
      onClick={e => {
        if (e.target !== ref.current) {
          return;
        }
        onClose();
      }}
    >
      <ModalBlockContainer>{children}</ModalBlockContainer>
    </ModalBlockBackground>
  );
};

export default Modal;
