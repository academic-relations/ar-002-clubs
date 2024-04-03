import Typography from "@sparcs-clubs/web/common/components/Typography";
import React from "react";
import styled from "styled-components";

interface ItemButtonProps {
  image?: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

const StyledButton = styled.div<{ selected: boolean }>`
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  border-radius: 8px;
  background: ${({ theme, selected }) =>
    selected ? theme.colors.PRIMARY : theme.colors.WHITE};
  box-shadow: -1px 2px 4px 0px rgba(0, 0, 0, 0.25);
  color: ${({ theme, selected }) =>
    selected ? theme.colors.WHITE : theme.colors.BLACK};
`;

const StyledImage = styled.img`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.GRAY[200]};
  width: 80px;
  height: 80px;
`;

const ItemButton: React.FC<ItemButtonProps> = ({
  name,
  image = "",
  selected,
  onClick,
}) => (
  <StyledButton selected={selected} onClick={() => onClick()}>
    <StyledImage src={image} />
    <Typography type={selected ? "h3_b" : "h3"}>{name}</Typography>
  </StyledButton>
);

export default ItemButton;
