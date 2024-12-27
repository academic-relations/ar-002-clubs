import React from "react";

import { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";

import NewActivityReportList from "@sparcs-clubs/web/features/activity-report/components/NewActivityReportList";
import useGetNewActivityReportList from "@sparcs-clubs/web/features/activity-report/services/useGetNewActivityReportList";
import { NewActivityReport } from "@sparcs-clubs/web/features/activity-report/types/activityReport";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const ActivityManageFrame: React.FC = () => {
  const { data } = useGetMyManageClub() as {
    data: ApiClb015ResponseOk;
    isLoading: boolean;
  };

  const {
    data: newActivityReportList,
    isLoading: isLoadingNewActivityReport,
    isError: isErrorNewActivityReport,
  } = useGetNewActivityReportList({
    clubId: data.clubId,
  });

  return (
    <FoldableSectionTitle title="동아리 활동">
      <FlexWrapper direction="column" gap={40}>
        <AsyncBoundary
          isLoading={isLoadingNewActivityReport}
          isError={isErrorNewActivityReport}
        >
          <FlexWrapper direction="column" gap={20}>
            <MoreDetailTitle
              title="활동 보고서"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/activity-report"
            />
            <NewActivityReportList
              data={newActivityReportList as NewActivityReport[]}
            />
          </FlexWrapper>
        </AsyncBoundary>
        {/* 
        // NOTE: 지원금은 추후 추가 예정
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title="지원금"
            moreDetail="내역 더보기"
            moreDetailPath="/manage-club/funding"
          />
          <FundingTable fundingList={mockupManageFunding} />
        </FlexWrapper> 
        */}
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default ActivityManageFrame;
