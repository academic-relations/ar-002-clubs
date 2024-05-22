import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Button from "../Button";
import Typography from "../Typography";
import Icon from "../Icon";

// TODO: 나중에 Buttons 폴더로 묶으면 어떨지
export interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  type: "default" | "disabled" | "outlined";
  buttonText: string;
  iconType: string;
}

const ButtonInner = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
`;

const IconButton: React.FC<IconButtonProps> = ({
  type = "default",
  buttonText = "",
  iconType = "",
  ...props
}) => (
  <Button type={type} {...props}>
    <ButtonInner>
      <Icon type={iconType} size={16} color="white" />
      <Typography type="span">{buttonText}</Typography>
    </ButtonInner>
  </Button>
);

export default IconButton;
