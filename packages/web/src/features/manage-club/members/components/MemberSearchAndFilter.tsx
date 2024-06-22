import React from "react";

import styled from "styled-components";

import Filter from "@sparcs-clubs/web/common/components/Filter/Index";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";

import { SemesterListProps } from "../types/semesterList";

const SearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 36px;
`;

const ResetButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
`;

const MemberSearchAndFilter: React.FC<
  SemesterListProps & {
    searchText: string;
    handleChange: (value: string) => void;
  }
> = ({
  semesters,
  selectedSemesters,
  setSelectedSemesters,
  searchText,
  handleChange,
}) => {
  const handleReset = () => {
    setSelectedSemesters(semesters);
    handleChange("");
  };
  return (
    <FlexWrapper direction="column" gap={20}>
      <SearchAndFilterWrapper>
        <SearchInput searchText={searchText} handleChange={handleChange} />
        <Filter
          semesters={semesters}
          selectedSemesters={selectedSemesters}
          setSelectedSemesters={setSelectedSemesters}
        />
      </SearchAndFilterWrapper>
      <ResetButtonWrapper>
        <TextButton
          text="검색/필터 초기화"
          onClick={handleReset}
          disabled={semesters === selectedSemesters && searchText === ""}
        />
      </ResetButtonWrapper>
    </FlexWrapper>
  );
};

export default MemberSearchAndFilter;
