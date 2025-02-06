import React from "react";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";

import ExecutiveChargedFundingsTable from "../components/ExecutiveChargedFundingsTable";
import FundingChargedStatistic from "../components/FundingChargedStatistic";
import useGetChargedFundings from "../services/useGetChargedFundings";

const ExecutiveFundingChargedFrame: React.FC = () => {
  const { id: executiveId } = useParams();
  const [searchText, setSearchText] = React.useState<string>("");
  const { data, isLoading, isError } = useGetChargedFundings({
    executiveId: Number(executiveId),
  });

  window.history.replaceState({ isClubView: false }, "");

  const defaultData = {
    totalCount: 0,
    appliedCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    committeeCount: 0,
    partialCount: 0,
    fundings: [],
    chargedExecutive: {
      id: Number(executiveId),
      name: "",
      studentNumber: "",
    },
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={20}>
        <FundingChargedStatistic data={data ?? defaultData} />
        <SearchInput
          searchText={searchText}
          handleChange={setSearchText}
          placeholder="검색어를 입력하세요"
        />
        <ExecutiveChargedFundingsTable
          data={data ?? defaultData}
          searchText={searchText}
        />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveFundingChargedFrame;
