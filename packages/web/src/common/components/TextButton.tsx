import React from "react";
import styled from "styled-components";

interface ButtonProps {
  disabled: boolean;
}

const StyledTextButton = styled.button<ButtonProps>`
  background: none;
  border: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.GRAY[300] : theme.colors.PRIMARY};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  text-decoration: underline;
`;

interface TextButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  disabled = false,
  onClick = () => {},
}) => (
  <StyledTextButton disabled={disabled} onClick={onClick}>
    {text}
  </StyledTextButton>
);

export default TextButton;
