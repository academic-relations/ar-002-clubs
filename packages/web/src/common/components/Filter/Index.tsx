import React, { useState } from "react";
import styled from "styled-components";
import FilterButton from "./_atomic/FilterButton";
import FilterDropdown from "./_atomic/FilterDropdown";

interface FilterSelectProps {
  semesters: string[];
  selectedSemesters?: string[];
  setSelectedSemesters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Filter: React.FC<FilterSelectProps> = ({
  semesters,
  selectedSemesters = [],
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
