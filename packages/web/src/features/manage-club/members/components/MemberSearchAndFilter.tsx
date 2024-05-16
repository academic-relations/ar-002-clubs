import Filter from "@sparcs-clubs/web/common/components/Filter/Index";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import React from "react";
import styled from "styled-components";
import { SemesterListProps } from "../types/semesterList";

const MemberSearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

const MemberSearchAndFilter: React.FC<SemesterListProps> = ({
  semesters,
  selectedSemesters,
  setSelectedSemesters,
}) => {
  const handleReset = () => {
    setSelectedSemesters(semesters);
  };
  return (
    <MemberSearchAndFilterWrapper>
      <SearchAndFilterWrapper>
        <SearchInput />
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
          disabled={semesters === selectedSemesters}
        />
        {/* TODO: 검색어 있는지 여부 확인 */}
      </ResetButtonWrapper>
    </MemberSearchAndFilterWrapper>
  );
};

export default MemberSearchAndFilter;
