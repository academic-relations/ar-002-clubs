import React from "react";
import styled from "styled-components";

interface FilterDropdownProps {
  semesters: string[];
  selectedSemesters: string[];
}

const SelectList = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  position: absolute;
  margin-top: 40px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: 1000; // Ensure the dropdown appears above other content
`;

const SelectItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 8px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.GRAY[200] : "transparent"};
`;

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  semesters,
  selectedSemesters,
}) => (
  <SelectList>
    {semesters.map(semester => (
      <SelectItem
        key={semester}
        isSelected={selectedSemesters.includes(semester)}
      >
        {semester}
      </SelectItem>
    ))}
  </SelectList>
);

export default FilterDropdown;
