import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";

import ActivityReportStatistic from "../components/ActivityReportStatistic";
import ExecutiveActivityClubTable from "../components/ExecutiveActivityClubTable";
import useGetExecutiveActivities from "../services/useGetExecutiveActivities";

const ExecutiveActivityReportFrame = () => {
  const [isClubView, setIsClubView] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading, isError } = useGetExecutiveActivities();

  const [selectedClubIds, setSelectedClubIds] = useState<number[]>([]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ActivityReportStatistic activities={data ?? { items: [] }} />
      <FlexWrapper direction="row" gap={12}>
        <Button
          style={{ flex: 1 }}
          type={isClubView ? "default" : "outlined"}
          onClick={() => setIsClubView(true)}
        >
          동아리별
        </Button>
        <Button
          style={{ flex: 1 }}
          type={isClubView ? "outlined" : "default"}
          onClick={() => setIsClubView(false)}
        >
          담당자별
        </Button>
      </FlexWrapper>
      <FlexWrapper direction="row" gap={16}>
        <SearchInput
          searchText={searchText}
          handleChange={setSearchText}
          placeholder=""
        />
        {isClubView && <Button>담당자 변경</Button>}
      </FlexWrapper>
      {isClubView ? (
        <ExecutiveActivityClubTable
          activities={data ?? { items: [] }}
          searchText={searchText}
          selectedClubIds={selectedClubIds}
          setSelectedClubIds={setSelectedClubIds}
        />
      ) : (
        <div>담당자별</div>
      )}
    </AsyncBoundary>
  );
};

export default ExecutiveActivityReportFrame;
