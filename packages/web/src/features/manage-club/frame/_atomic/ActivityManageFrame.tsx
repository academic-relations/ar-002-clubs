import React from "react";
import styled from "styled-components";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";
import FundingTable from "@sparcs-clubs/web/features/manage-club/component/FundingTable";
import ActivityReportTable from "@sparcs-clubs/web/features/manage-club/component/ActivityReportTable";

import {
  mockupManageFunding,
  mockupManageReport,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

const ActivityManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ActivityManageFrame: React.FC = () => (
  <ActivityManageWrapper>
    <SectionWrapper>
      <MoreDetailTitle
        title="활동 보고서"
        moreDetail="내역 더보기"
        moreDetailPath="/manage-club/activity-report"
      />
      <ActivityReportTable activityList={mockupManageReport} />
    </SectionWrapper>
    <SectionWrapper>
      <MoreDetailTitle
        title="지원금"
        moreDetail="내역 더보기"
        moreDetailPath="/manage-club/funding"
      />
      <FundingTable fundingList={mockupManageFunding} />
    </SectionWrapper>
  </ActivityManageWrapper>
);

export default ActivityManageFrame;
