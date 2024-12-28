import React from "react";

import { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

import Link from "next/link";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

import CurrentActivityReportTable from "../components/CurrentActivityReportTable";
import PastActivityReportList from "../components/PastActivityReportList";
import { MAX_ACTIVITY_REPORT_COUNT } from "../constants";
import useGetActivityTerms from "../services/useGetActivityTerms";
import useGetNewActivityReportList from "../services/useGetNewActivityReportList";

interface ActivityReportMainFrameProps {
  clubId: number;
}

const ActivityReportMainFrame: React.FC<ActivityReportMainFrameProps> = ({
  clubId,
}) => {
  const { data } = useGetMyManageClub() as {
    data: ApiClb015ResponseOk;
    isLoading: boolean;
  };

  const {
    data: newActivityReportList,
    isLoading: isLoadingNewActivityReport,
    isError: isErrorNewActivityReport,
  } = useGetNewActivityReportList({
    clubId,
  });

  const {
    data: activityTerms,
    isLoading: isLoadingActivityTerms,
    isError: isErrorActivityTerms,
  } = useGetActivityTerms({ clubId: data.clubId });

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서"
      />
      <FoldableSectionTitle childrenMargin="20px" title="신규 활동 보고서">
        <FlexWrapper direction="column" gap={20}>
          <Info text="현재는 2024년 여름-가을학기 활동 보고서 작성 기간입니다 (작성 마감 : 2025년 1월 7일 23:59)" />
          <AsyncBoundary
            isLoading={isLoadingNewActivityReport}
            isError={isErrorNewActivityReport}
          >
            <FlexWrapper direction="row" gap={16} justify="flex-end">
              <Typography
                fs={14}
                fw="REGULAR"
                lh={20}
                color="GRAY.300"
                ff="PRETENDARD"
              >
                활동 보고서는 최대 20개까지 작성 가능합니다
              </Typography>
              <Link href="/manage-club/activity-report/create">
                <IconButton
                  type={
                    newActivityReportList &&
                    newActivityReportList.length >= MAX_ACTIVITY_REPORT_COUNT
                      ? "disabled"
                      : "default"
                  }
                  icon="add"
                  onClick={() => {}}
                >
                  활동 보고서 작성
                </IconButton>
              </Link>
            </FlexWrapper>
            <CurrentActivityReportTable clubId={data.clubId} />
          </AsyncBoundary>
        </FlexWrapper>
      </FoldableSectionTitle>
      <FoldableSectionTitle title="과거 활동 보고서">
        <FlexWrapper direction="column" gap={40}>
          <AsyncBoundary
            isLoading={isLoadingActivityTerms}
            isError={isErrorActivityTerms}
          >
            {activityTerms?.terms
              .toReversed()
              .map(term => (
                <PastActivityReportList
                  key={term.id}
                  term={term}
                  clubId={data.clubId}
                />
              ))}
          </AsyncBoundary>
        </FlexWrapper>
      </FoldableSectionTitle>
    </FlexWrapper>
  );
};

export default ActivityReportMainFrame;
