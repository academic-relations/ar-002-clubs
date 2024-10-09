import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { CategoryProps } from "../types/FilterCategories";

interface CategoryListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: CategoryProps;
}

const DetailFilterButtonWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isOpen: boolean }>`
  width: 100%; // CHACHA: 뭔가 고정 값이어야 MultiFilterDropdown이 디자인대로 되지 않을까요? (모든 필터 버튼의 너비가 같음)
  display: flex;
  height: 36px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid
    ${({ theme, isOpen }) =>
      isOpen ? theme.colors.PRIMARY : theme.colors.GRAY[200]};
  border-radius: 4px;
  cursor: pointer;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  align-self: stretch;
`;

const DetailFilterButton: React.FC<CategoryListProps> = ({
  isOpen,
  setIsOpen,
  category,
}) => {
  const changeOpen = () => setIsOpen(!isOpen);
  return (
    <DetailFilterButtonWrapper isOpen={isOpen} onClick={changeOpen}>
      {category.selectedContent.length > 0 ? (
        <>
          {category.selectedContent.length !== category.content.length ? (
            <Typography fs={16} lh={20} fw="REGULAR">
              {category.selectedContent.length > 1
                ? `${category.selectedContent[0]} 외 ${category.selectedContent.length - 1}개`
                : `${category.selectedContent[0]}`}
            </Typography>
          ) : (
            <Typography fs={16} lh={20} fw="REGULAR">
              모두 선택
            </Typography>
          )}
        </>
      ) : (
        <Typography fs={16} lh={20} fw="REGULAR">
          미선택
        </Typography>
      )}
      <Icon type="expand_more" size={20} />
    </DetailFilterButtonWrapper>
  );
};

export default DetailFilterButton;
