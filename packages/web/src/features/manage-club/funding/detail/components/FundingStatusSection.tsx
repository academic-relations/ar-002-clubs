import React, { useMemo } from "react";

import { IFundingCommentResponse } from "@sparcs-clubs/interface/api/funding/type/funding.comment.type";
import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import Toast from "@sparcs-clubs/web/common/components/Toast";
import ApproveReasonToast from "@sparcs-clubs/web/common/components/Toast/ApproveReasonToast";
import RejectReasonToast from "@sparcs-clubs/web/common/components/Toast/RejectReasonToast";
import { FundingTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getFundingProgress } from "@sparcs-clubs/web/features/manage-club/funding/constants/fundingProgressStatus";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface FundingStatusSectionProps {
  status: FundingStatusEnum;
  editedAt: Date;
  commentedAt?: Date;
  comments: IFundingCommentResponse[];
}

const FundingStatusSection: React.FC<FundingStatusSectionProps> = ({
  status,
  editedAt,
  commentedAt = undefined,
  comments,
}) => {
  const progressStatus = getFundingProgress(status, editedAt, commentedAt);

  const filteredComments = comments.filter(
    comment => comment.content.trim() !== "",
  );

  const ToastSection = useMemo(() => {
    const reasons = filteredComments.map(comment => ({
      datetime: comment.createdAt,
      reason: comment.content,
      status:
        comment.fundingStatusEnum === FundingStatusEnum.Partial
          ? `${getTagDetail(comment.fundingStatusEnum, FundingTagList).text} 승인`
          : getTagDetail(comment.fundingStatusEnum, FundingTagList).text,
    }));

    if (status === FundingStatusEnum.Rejected) {
      return <RejectReasonToast title="코멘트" reasons={reasons} />;
    }

    if (status === FundingStatusEnum.Committee) {
      return <Toast title="코멘트" color="yellow" reasons={reasons} />;
    }

    return <ApproveReasonToast title="코멘트" reasons={reasons} />;
  }, [filteredComments, status]);

  return (
    <ProgressStatus
      labels={progressStatus.labels}
      progress={progressStatus.progress}
      optional={filteredComments && filteredComments.length > 0 && ToastSection}
    />
  );
};

export default FundingStatusSection;
