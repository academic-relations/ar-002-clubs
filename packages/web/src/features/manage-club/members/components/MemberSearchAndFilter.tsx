import FilterButton from "@sparcs-clubs/web/common/components/FilterButton";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import React from "react";
import styled from "styled-components";

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

const MemberSearchAndFilter = () => (
  <MemberSearchAndFilterWrapper>
    <SearchAndFilterWrapper>
      <SearchInput />
      <FilterButton />
    </SearchAndFilterWrapper>
    <ResetButtonWrapper>
      <TextButton text="검색/필터 초기화" />
    </ResetButtonWrapper>
  </MemberSearchAndFilterWrapper>
);

export default MemberSearchAndFilter;
