import Filter from "@sparcs-clubs/web/common/components/Filter/Index";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import React from "react";
import styled from "styled-components";

interface MemberSearchAndFilterProps {
  semesters: string[];
  selectedSemesters: string[];
  setSelectedSemesters: React.Dispatch<React.SetStateAction<string[]>>;
}

const MemberSearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchAndFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ResetButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
`;

const MemberSearchAndFilter: React.FC<MemberSearchAndFilterProps> = ({
  semesters,
  selectedSemesters,
  setSelectedSemesters,
}) => (
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
      <TextButton text="검색/필터 초기화" />
    </ResetButtonWrapper>
  </MemberSearchAndFilterWrapper>
);

export default MemberSearchAndFilter;
