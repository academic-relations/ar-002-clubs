import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { CategoryProps } from "../types/FilterCategories";

interface CategoriesListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryProps[];
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

const MultiFilterButton: React.FC<CategoriesListProps> = ({
  isOpen,
  setIsOpen,
  categories,
}) => {
  const changeOpen = () => setIsOpen(!isOpen);

  return (
    <FilterButtonWrapper isOpen={isOpen} onClick={changeOpen}>
      {categories[0].selectedContent.length === 0 ? (
        <Typography fs={16} lh={20} fw="REGULAR">
          미선택,
        </Typography>
      ) : (
        <Typography fs={16} lh={20} fw="REGULAR">
          {categories[0].selectedContent.length > 1
            ? `${categories[0].selectedContent[0]} 외 ${categories[0].selectedContent.length - 1}개,`
            : `${categories[0].selectedContent[0]},`}
        </Typography>
      )}
      {categories.length > 1 && (
        <>
          {categories[1].selectedContent.length === 0 ? (
            <Typography fs={16} lh={20} fw="REGULAR">
              {`미선택${categories.length > 2 ? "..." : ""}`}
            </Typography>
          ) : (
            <Typography fs={16} lh={20} fw="REGULAR">
              {categories[1].selectedContent.length > 1
                ? `${categories[1].selectedContent[0]} 외 ${categories[1].selectedContent.length - 1}개${categories.length > 2 ? "..." : ""}`
                : `${categories[1].selectedContent[0]}${categories.length > 2 ? "..." : ""}`}
            </Typography>
          )}
        </>
      )}
      <Icon type="filter_list" size={20} />
    </FilterButtonWrapper>
  );
};

export default MultiFilterButton;
