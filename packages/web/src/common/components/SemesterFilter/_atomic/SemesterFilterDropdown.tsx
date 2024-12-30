import React from "react";

import Dropdown from "@sparcs-clubs/web/common/components/Select/Dropdown";
import SelectedItem from "@sparcs-clubs/web/common/components/SelectedItem";
import {
  SemesterListProps,
  SemesterProps,
} from "@sparcs-clubs/web/features/manage-club/members/types/semesterList";

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
    <Dropdown marginTop={40} maxContent>
      {semesters.map(semester => (
        <SelectedItem
          key={semester.id}
          text={`${semester.year}년 ${semester.name}학기`}
          isSelected={selectedSemesters.includes(semester)}
          onClick={() => handleSelect(semester)}
        />
      ))}
    </Dropdown>
  );
};

export default FilterDropdown;
