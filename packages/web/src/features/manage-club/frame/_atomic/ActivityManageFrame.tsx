import React from "react";
import styled from "styled-components";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";

const ActivityManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ActivityManageFrame: React.FC = () => (
  <ActivityManageWrapper>
    <MoreDetailTitle
      title="활동 보고서"
      moreDetail="내역 더보기"
      moreDetailPath="/manage-club/activity-report"
    />
    활동 보고서 table
    <MoreDetailTitle
      title="지원금"
      moreDetail="내역 더보기"
      moreDetailPath="/manage-club/funding"
    />
    지원금 table
  </ActivityManageWrapper>
);

export default ActivityManageFrame;
