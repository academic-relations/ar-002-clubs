import React, { useMemo } from "react";

import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import ApproveReasonToast from "@sparcs-clubs/web/common/components/Toast/ApproveReasonToast";
import RejectReasonToast from "@sparcs-clubs/web/common/components/Toast/RejectReasonToast";

import { getActivityReportProgress } from "../constants/activityReportProgress";
import { Comment } from "../types/activityReport";

interface ActivityReportStatusSectionProps {
  status: ActivityStatusEnum;
  editedAt: Date;
  commentedAt?: Date;
  comments: Comment[];
}

const ActivityReportStatusSection: React.FC<
  ActivityReportStatusSectionProps
> = ({ status, editedAt, commentedAt = undefined, comments }) => {
  const progressStatus = getActivityReportProgress(
    status,
    editedAt,
    commentedAt,
  );

  const ToastSection = useMemo(() => {
    if (status === ActivityStatusEnum.Rejected) {
      return (
        <RejectReasonToast
          title="코멘트"
          reasons={comments.map(comment => ({
            datetime: comment.createdAt,
            reason: comment.content,
          }))}
        />
      );
    }

    return (
      <ApproveReasonToast
        title="코멘트"
        reasons={comments.map(comment => ({
          datetime: comment.createdAt,
          reason: comment.content,
        }))}
      />
    );
  }, [comments, status]);

  return (
    <ProgressStatus
      labels={progressStatus.labels}
      progress={progressStatus.progress}
      optional={comments && comments.length > 0 && ToastSection}
    />
  );
};

export default ActivityReportStatusSection;
