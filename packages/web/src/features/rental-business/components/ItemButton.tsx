import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ItemButtonProps {
  image?: string;
  name: string;
  selected: boolean;
  onClick: () => void;
  have?: boolean;
}

const StyledButton = styled(Card)<{ selected: boolean; onClick: () => void }>`
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.PRIMARY : theme.colors.WHITE};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.WHITE : theme.colors.BLACK};
  position: relative;
`;

const ImageContent = styled.img`
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;
`;
const HaveIndicator = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ have: boolean; selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.WHITE : theme.colors.PRIMARY};
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);

  ${({ have }) =>
    !have &&
    css`
      display: none;
    `}
`;

const StyledImage = styled.div`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.GRAY[200]};
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemButton: React.FC<ItemButtonProps> = ({
  name,
  image = "",
  selected,
  onClick,
  have = false,
}) => (
  <StyledButton selected={selected} onClick={onClick}>
    <StyledImage>
      <ImageContent src={image} alt="item image" />
      {have && <HaveIndicator have={have} selected={selected} />}
    </StyledImage>
    <Typography type={selected ? "h3_b" : "h3"}>{name}</Typography>
  </StyledButton>
);

export default ItemButton;
