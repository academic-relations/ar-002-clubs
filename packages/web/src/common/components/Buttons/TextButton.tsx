import React from "react";

import styled from "styled-components";

import { Theme } from "@sparcs-clubs/web/styles/themes";
import colors from "@sparcs-clubs/web/styles/themes/colors";

type FontWeight = keyof Theme["fonts"]["WEIGHT"];

interface ButtonProps {
  disabled: boolean;
  color: string;
  fw: FontWeight;
}

const StyledTextButton = styled.button<ButtonProps>`
  background: none;
  border: none;
  color: ${({ color }) => color};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme, fw }) => theme.fonts.WEIGHT[fw]};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  text-decoration: underline;
`;

interface TextButtonProps {
  text: string;
  disabled?: boolean;
  color?: "primary" | "gray";
  fw?: FontWeight;
  onClick?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  disabled = false,
  color = "primary",
  fw = "MEDIUM",
  onClick = () => {},
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick();
  };

  const colorList = {
    disabled: colors.GRAY[300],
    primary: colors.PRIMARY,
    gray: colors.GRAY[600],
  };

  const textColor = disabled ? colorList.disabled : colorList[color];

  return (
    <StyledTextButton
      disabled={disabled}
      onClick={handleClick}
      color={textColor}
      fw={fw}
    >
      {text}
    </StyledTextButton>
  );
};

export default TextButton;
