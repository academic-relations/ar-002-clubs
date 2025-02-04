import React, { useMemo } from "react";

import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import ApproveReasonToast from "@sparcs-clubs/web/common/components/ApproveReasonToast";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import { ActStatusTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

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
            status: getTagDetail(status, ActStatusTagList).text,
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
          status: getTagDetail(status, ActStatusTagList).text, // TODO: status 수정
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
