import React from "react";

import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";

const ActivityReportDetailedFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
`;

const ActivityReportDetailedFrame: React.FC = () => (
  <ActivityReportDetailedFrameInner>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "활동 보고서", path: "/manage-club/activity-report" },
      ]}
      title="활동 보고서"
      enableLast
    />
  </ActivityReportDetailedFrameInner>
);

export default ActivityReportDetailedFrame;
