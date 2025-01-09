import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";

import ActivityReportClubStatistic from "../components/ActivityReportClubStatistic";
import ExecutiveClubActivitiesTable from "../components/ExecutiveClubActivitiesTable";
import useGetExecutiveClubActivities from "../services/useGetExecutiveClubActivities";

const ExecutiveActivityReportClubFrame: React.FC<{ clubId: string }> = ({
  clubId,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading, isError } = useGetExecutiveClubActivities({
    clubId: Number(clubId),
  });

  const [selectedActivityIds, setSelectedActivityIds] = useState<number[]>([]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ActivityReportClubStatistic data={data ?? { items: [] }} />
      <FlexWrapper direction="row" gap={16}>
        <SearchInput
          searchText={searchText}
          handleChange={setSearchText}
          placeholder=""
        />
        <Button>담당자 변경</Button>
      </FlexWrapper>
      <ExecutiveClubActivitiesTable
        data={data ?? { items: [] }}
        searchText={searchText}
        selectedActivityIds={selectedActivityIds}
        setSelectedActivityIds={setSelectedActivityIds}
      />
    </AsyncBoundary>
  );
};

export default ExecutiveActivityReportClubFrame;
