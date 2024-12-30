import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import { SemesterListProps } from "@sparcs-clubs/web/features/manage-club/members/types/semesterList";

import SemesterFilterButton from "./_atomic/SemesterFilterButton";
import SemesterFilterDropdown from "./_atomic/SemesterFilterDropdown";

const FilterOuterWrapper = styled.div`
  display: inline-flex;
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const SemesterFilter: React.FC<SemesterListProps> = ({
  semesters,
  selectedSemesters = semesters,
  setSelectedSemesters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FilterOuterWrapper ref={wrapperRef}>
      <FilterWrapper>
        <SemesterFilterButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          semesters={semesters}
          selectedSemesters={selectedSemesters}
        />
        {isOpen && (
          <SemesterFilterDropdown
            semesters={semesters}
            selectedSemesters={selectedSemesters}
            setSelectedSemesters={setSelectedSemesters}
          />
        )}
      </FilterWrapper>
    </FilterOuterWrapper>
  );
};

export default SemesterFilter;
