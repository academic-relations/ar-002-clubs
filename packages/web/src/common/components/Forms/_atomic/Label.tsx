// Label.tsx
import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin: 0px 2px 0px 2px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 20px;
  text-align: left;
`;

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => (
  <StyledLabel>{children}</StyledLabel>
);

export default Label;
