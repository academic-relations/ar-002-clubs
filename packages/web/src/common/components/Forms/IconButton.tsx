import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Button from "../Button";
import Typography from "../Typography";
import Icon from "../Icon";

export interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  type: "default" | "disabled" | "outlined";
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
  iconType = "",
  ...props
}) => (
  <Button type={type} {...props}>
    <ButtonInner>
      <Icon type={iconType} size={16} color="white" />
      <Typography type="span">활동 내역 추가</Typography>
    </ButtonInner>
  </Button>
);

export default IconButton;
