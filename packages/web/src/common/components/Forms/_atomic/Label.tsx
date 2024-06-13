// Label.tsx
import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label<{ type: LabelProps["type"] }>`
  display: block;
  margin: 0px 2px 0px 2px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 20px;
  text-align: left;
  cursor: ${({ type }) => (type === "clickable" ? "pointer" : "default")};
`;

interface LabelProps {
  children: React.ReactNode;
  type?: "default" | "clickable";
  onClick?: () => void;
}

const Label: React.FC<LabelProps> = ({
  children,
  type = "default",
  onClick = () => {},
}) => (
  <StyledLabel type={type} onClick={type === "clickable" ? onClick : () => {}}>
    {children}
  </StyledLabel>
);

export default Label;
