// Label.tsx
import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.BLACK};
`;

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => (
  <StyledLabel>{children}</StyledLabel>
);

export default Label;
