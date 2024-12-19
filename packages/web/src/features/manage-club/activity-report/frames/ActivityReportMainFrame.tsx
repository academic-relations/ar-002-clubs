import React from "react";

import Link from "next/link";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import NewActivityReportList from "../components/NewActivityReportList";
import PastActivityReportList from "../components/PastActivityReportList";
import useGetActivityTerms from "../services/useGetActivityTerms";
import useGetNewActivityReportList from "../services/useGetNewActivityReportList";

const ActivityReportMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
`;

const OptionOuter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const SectionInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const PastSectionInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`;

const ActivityReportMainFrame: React.FC = () => {
  // TODO(ym). manage-club 페이지에서 라우팅 연결되면 clubId props로 받아오기!
  const clubId = 117;
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
  } = useGetActivityTerms({ clubId });

  const isLoading = isLoadingActivityTerms;
  const isError = isErrorActivityTerms;

  return (
    <ActivityReportMainFrameInner>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서"
      />
      <FoldableSectionTitle childrenMargin="20px" title="신규 활동 보고서">
        <SectionInner>
          <Info text="현재는 2024년 봄학기 활동 보고서 작성 기간입니다 (작성 마감 : 2024년 3월 10일 23:59)" />
          <OptionOuter>
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
              <IconButton type="default" icon="add" onClick={() => {}}>
                활동 보고서 작성
              </IconButton>
            </Link>
          </OptionOuter>
          <AsyncBoundary
            isLoading={isLoadingNewActivityReport}
            isError={isError}
          >
            <NewActivityReportList data={newActivityReportList} />
          </AsyncBoundary>
        </SectionInner>
      </FoldableSectionTitle>
      {/* TODO: profile 설정 */}
      <FoldableSectionTitle title="과거 활동 보고서">
        <PastSectionInner>
          <AsyncBoundary
            isLoading={isLoading}
            isError={isErrorNewActivityReport}
          >
            {activityTerms?.terms.map(term => (
              <PastActivityReportList
                key={term.id}
                term={term}
                clubId={clubId}
              />
            ))}
          </AsyncBoundary>
        </PastSectionInner>
      </FoldableSectionTitle>
    </ActivityReportMainFrameInner>
  );
};

export default ActivityReportMainFrame;
