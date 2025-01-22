import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityReportChargedStatistic from "../components/ActivityReportChargedStatistic";

const ExecutiveActivityReportChargedFrame: React.FC = () => {
  const executiveName = "집행부";
  const isLoading = false;
  const isError = false;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={40}>
        <PageHead
          items={[
            { name: "집행부원 대시보드", path: "/executive" },
            {
              name: "활동 보고서 작성 내역",
              path: `/executive/activity-report`,
            },
          ]}
          title={`활동 보고서 검토 내역 (${executiveName})`}
          enableLast
        />
        <ActivityReportChargedStatistic
          activities={{ items: [], executiveProgresses: [] }}
        />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveActivityReportChargedFrame;
