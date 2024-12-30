import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { SemesterProps } from "@sparcs-clubs/web/features/manage-club/members/types/semesterList";

interface FilterButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  semesters: SemesterProps[];
  selectedSemesters: SemesterProps[];
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
  semesters,
  selectedSemesters,
}) => {
  const changeOpen = () => setIsOpen(!isOpen);
  return (
    <FilterButtonWrapper isOpen={isOpen} onClick={changeOpen}>
      {selectedSemesters.length > 0 &&
        (selectedSemesters.length !== semesters.length ? (
          <Typography fs={16} lh={20} fw="REGULAR">
            {selectedSemesters.length > 1
              ? `${selectedSemesters[0].year}년 ${selectedSemesters[0].name}학기 외 ${selectedSemesters.length - 1}개`
              : `${selectedSemesters[0].year}년 ${selectedSemesters[0].name}학기`}
          </Typography>
        ) : (
          <Typography fs={16} lh={20} fw="REGULAR">
            모든 학기 선택
          </Typography>
        ))}
      <Icon type="filter_list" size={20} />
    </FilterButtonWrapper>
  );
};

export default FilterButton;
