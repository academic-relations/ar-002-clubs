import React from "react";

import { useParams } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityReportChargedStatistic from "../components/ActivityReportChargedStatistic";
import useGetExecutiveChargedActivities from "../services/useGetExecutiveChargedActivities";

const ExecutiveActivityReportChargedFrame: React.FC = () => {
  const { id: executiveId } = useParams();
  const { data, isLoading, isError } = useGetExecutiveChargedActivities({
    executiveId: Number(executiveId),
  });

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
          title={`활동 보고서 검토 내역 (${data?.chargedExecutive.name})`}
          enableLast
        />
        <ActivityReportChargedStatistic activities={data?.activities ?? []} />
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveActivityReportChargedFrame;
