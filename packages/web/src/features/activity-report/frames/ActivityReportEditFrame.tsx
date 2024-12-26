import React, { useCallback } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityReportForm from "../components/ActivityReportForm";
import { useGetActivityReport } from "../services/useGetActivityReport";
import { usePutActivityReport } from "../services/usePutActivityReport";
import { ActivityReportFormData } from "../types/form";
import {
  transformFromApiAct002Response,
  transformToApiAct003RequestBody,
} from "../utils/transform";

interface ActivityReportEditFrameProps {
  id: string;
  clubId: number;
}

const ActivityReportEditFrame: React.FC<ActivityReportEditFrameProps> = ({
  id,
  clubId,
}) => {
  const { mutate } = usePutActivityReport();
  const { data, isLoading, isError } = useGetActivityReport(
    "undergraduate",
    Number(id),
  );

  const handleSubmit = useCallback(
    (_data: ActivityReportFormData) => {
      mutate(
        {
          activityId: Number(id),
          body: transformToApiAct003RequestBody(_data),
        },
        {
          onSuccess: () => {
            window.location.href = `/manage-club/activity-report/${id}`;
          },
        },
      );
    },
    [id, mutate],
  );

  if (!data) return null;

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 수정"
        enableLast
      />

      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <ActivityReportForm
          clubId={clubId}
          onSubmit={handleSubmit}
          initialData={transformFromApiAct002Response(data)}
        />
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ActivityReportEditFrame;
