import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import Typography from "./Typography";

interface SelectedItemProps {
  text: string;
  isDisabled?: boolean;
  isSelected?: boolean;
}

const SelectedItemWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  font-size: 14px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.GRAY[200] : "transparent"};
`;

const SelectedItem: React.FC<SelectedItemProps> = ({
  text,
  isDisabled = false,
  isSelected = false,
}) => (
  <SelectedItemWrapper isSelected={isSelected}>
    <Typography
      fs={16}
      lh={20}
      color={isDisabled ? "GRAY.300" : "BLACK"}
      style={{ flex: 1 }}
    >
      {/* TODO: hover */}
      {text}
    </Typography>
    {isSelected && !isDisabled ? <Icon type="check" size={16} /> : null}
  </SelectedItemWrapper>
);

export default SelectedItem;
