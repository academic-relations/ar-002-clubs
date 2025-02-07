import isPropValid from "@emotion/is-prop-valid";
import React from "react";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface FilterButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemList: string[];
  selectedList: string[];
}

const FilterButtonWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isOpen: boolean }>`
  width: max-content;
  display: flex;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid
    ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[200]};
  border-radius: 4px;
  cursor: pointer;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const FilterButton: React.FC<FilterButtonProps> = ({
  isOpen,
  setIsOpen,
  itemList,
  selectedList,
}) => {
  const changeOpen = () => setIsOpen(!isOpen);
  return (
    <FilterButtonWrapper isOpen={isOpen} onClick={changeOpen}>
      {selectedList.length > 0 &&
        (selectedList.length !== itemList.length ? (
          <Typography fs={16} lh={20} fw="REGULAR">
            {selectedList.length > 1
              ? `${selectedList[0]} 외 ${selectedList.length - 1}개`
              : `${selectedList[0]}`}
          </Typography>
        ) : (
          <Typography fs={16} lh={20} fw="REGULAR">
            모두 선택
          </Typography>
        ))}
      <Icon type="filter_list" size={20} />
    </FilterButtonWrapper>
  );
};

export default FilterButton;
