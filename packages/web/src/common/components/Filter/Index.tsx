import React, { useState } from "react";

import styled from "styled-components";

import { SemesterListProps } from "@sparcs-clubs/web/features/manage-club/members/types/semesterList";

import FilterButton from "./_atomic/FilterButton";
import FilterDropdown from "./_atomic/FilterDropdown";

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Filter: React.FC<SemesterListProps> = ({
  semesters,
  selectedSemesters = semesters,
  setSelectedSemesters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // TODO: filter 아닌 곳 클릭했을 때 닫히게 하기
  return (
    <FilterWrapper>
      <FilterButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        semesters={semesters}
        selectedSemesters={selectedSemesters}
      />
      {isOpen && (
        <FilterDropdown
          semesters={semesters}
          selectedSemesters={selectedSemesters}
          setSelectedSemesters={setSelectedSemesters}
        />
      )}
    </FilterWrapper>
  );
};

export default Filter;
