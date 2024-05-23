import React from "react";
import styled from "styled-components";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";
import {
  SemesterListProps,
  SemesterProps,
} from "@sparcs-clubs/web/features/manage-club/members/types/semesterList";

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

const FilterDropdown: React.FC<SemesterListProps> = ({
  semesters,
  selectedSemesters,
  setSelectedSemesters,
}) => {
  const handleSelect = (semester: SemesterProps) => {
    if (selectedSemesters.includes(semester)) {
      const updatedSelectedSemesters = selectedSemesters.filter(
        selectedSemester => selectedSemester !== semester,
      );
      setSelectedSemesters(updatedSelectedSemesters);
    } else {
      const updatedSelectedSemesters = [...selectedSemesters, semester];
      setSelectedSemesters(updatedSelectedSemesters);
    }
  };

  return (
    <SelectList>
      {semesters.map(semester => (
        <SelectedItem
          key={semester.id}
          text={`${semester.year}년 ${semester.name}학기`}
          isSelected={selectedSemesters.includes(semester)}
          onClick={() => handleSelect(semester)}
        />
      ))}
    </SelectList>
  );
};

export default FilterDropdown;
