import React, { useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Icon from "./Icon";

interface ToggleProps {
  label: React.ReactNode;
  children?: React.ReactNode;
}

const ToggleOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const ToggleInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const ChildrenOuter = styled.div`
  display: flex;
  padding-left: 28px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const RotatableIcon = styled(Icon).withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isOpen: boolean }>`
  transform: rotate(${({ isOpen }) => (isOpen ? 90 : 0)}deg);
  transition: transform 0.3s;
`;

const Toggle: React.FC<ToggleProps> = ({ label, children = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToggleOuter>
      <ToggleInner>
        <RotatableIcon
          size={20}
          type="chevron_right"
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        {label}
      </ToggleInner>
      {isOpen && <ChildrenOuter>{children}</ChildrenOuter>}
    </ToggleOuter>
  );
};

export default Toggle;
