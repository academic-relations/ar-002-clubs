import React from "react";
import styled from "styled-components";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";

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

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  semesters,
  selectedSemesters,
}) => (
  <SelectList>
    {semesters.map(semester => (
      <SelectedItem
        key={semester}
        text={semester}
        isSelected={selectedSemesters.includes(semester)}
      />
    ))}
  </SelectList>
);

export default FilterDropdown;
