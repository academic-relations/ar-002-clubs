import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import Typography from "./Typography";

interface SelectedItemProps {
  text: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

// TODO: Select 컴포넌트에 있는 코드 리팩토링해서 가져다 쓰기
const SelectedItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

const SelectedItem: React.FC<SelectedItemProps> = ({
  text,
  isDisabled = false,
  isSelected = false,
  onClick = () => {},
}) => (
  <SelectedItemWrapper onClick={onClick}>
    {/* // TODO: 글자 위아래 정렬 안 맞는 문제 해결 */}
    <Typography
      fs={16}
      lh={20}
      color={isDisabled ? "GRAY.300" : "BLACK"}
      style={{ flex: 1 }}
    >
      {text}
    </Typography>
    {isSelected && !isDisabled ? <Icon type="check" size={16} /> : null}
  </SelectedItemWrapper>
);

export default SelectedItem;
