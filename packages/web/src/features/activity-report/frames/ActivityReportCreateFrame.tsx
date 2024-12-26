import React, { useCallback } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityReportForm from "../components/ActivityReportForm";
import usePostActivityReport from "../services/usePostActivityReport";
import { ActivityReportFormData } from "../types/form";
import { transformToApiAct001RequestBody } from "../utils/transform";

interface ActivityReportCreateFrameProps {
  clubId: number;
}

const ActivityReportCreateFrame: React.FC<ActivityReportCreateFrameProps> = ({
  clubId,
}) => {
  const { mutate } = usePostActivityReport();

  const handleSubmit = useCallback(
    (data: ActivityReportFormData) => {
      mutate(
        { body: transformToApiAct001RequestBody(data, clubId) },
        {
          onSuccess: () => {
            window.location.href = "/manage-club/activity-report";
          },
        },
      );
    },
    [clubId, mutate],
  );

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 작성"
        enableLast
      />
      <ActivityReportForm clubId={clubId} onSubmit={handleSubmit} />
    </FlexWrapper>
  );
};

export default ActivityReportCreateFrame;
