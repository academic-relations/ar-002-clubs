import React from "react";

import Link from "next/link";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FoldableSection from "@sparcs-clubs/web/common/components/FoldableSection";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { mockNewActivityData, mockPastActivityData } from "../_mock/mock";
import NewActivityReportList from "../components/NewActivityReportList";
import PastActivityReportList from "../components/PastActivityReportList";

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

const ActivityReportMainFrame: React.FC = () => (
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
            <Button type="default">+ 활동 보고서 작성</Button>
          </Link>
        </OptionOuter>
        <NewActivityReportList data={mockNewActivityData} />
      </SectionInner>
    </FoldableSectionTitle>
    <FoldableSectionTitle title="과거 활동 보고서">
      <PastSectionInner>
        <FoldableSection title="2023년 가을학기 (총 6개)">
          <PastActivityReportList data={mockPastActivityData} />
        </FoldableSection>
        <FoldableSection title="2023년 봄학기 (총 6개)">
          <PastActivityReportList data={mockPastActivityData} />
        </FoldableSection>
        <FoldableSection title="2022년 가을학기 (총 6개)">
          <PastActivityReportList data={mockPastActivityData} />
        </FoldableSection>
      </PastSectionInner>
    </FoldableSectionTitle>
  </ActivityReportMainFrameInner>
);

export default ActivityReportMainFrame;
