import React, { useState } from "react";

import { useParams } from "next/navigation";

import { overlay } from "overlay-kit";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

import useExecutiveApproveActivityReport from "../hooks/useExecutiveApproveActivityReport";
import useExecutiveRejectActivityReport from "../hooks/useExecutiveRejectActivityReport";
import { Comment } from "../types/activityReport";

const ExecutiveActivityReportApprovalSection: React.FC<{
  comments: Comment[];
  clubId: number;
}> = ({ comments, clubId }) => {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);

  const { mutate: approveActivityReport } = useExecutiveApproveActivityReport(
    activityId,
    clubId,
  );
  const { mutate: rejectActivityReport } = useExecutiveRejectActivityReport(
    activityId,
    clubId,
  );
  const [rejectionDetail, setRejectionDetail] = useState("");

  const handleApprove = () => {
    approveActivityReport(undefined, {
      onSuccess: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 승인이 완료되었습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
      onError: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 승인에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  };

  const handleReject = () => {
    rejectActivityReport(rejectionDetail, {
      onSuccess: () => {
        setRejectionDetail("");
      },
      onError: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 반려에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  };

  return (
    <Card outline padding="32px" gap={20}>
      {comments.length > 0 && (
        <FlexWrapper direction="column" gap={8}>
          {comments.map((comment, index) => (
            <FlexWrapper direction="column" gap={4} key={`${index.toString()}`}>
              <Typography fs={14} lh={16} color="GRAY.600">
                {formatSlashDateTime(comment.createdAt)}
              </Typography>
              <Typography fs={16} lh={24}>
                {comment.content}
              </Typography>
            </FlexWrapper>
          ))}
        </FlexWrapper>
      )}

      <TextInput
        label="반려 사유(반려 시에만 입력)"
        value={rejectionDetail}
        handleChange={setRejectionDetail}
        placeholder="내용"
        area
      />

      <FlexWrapper justify="flex-end" gap={16}>
        <Button onClick={handleApprove}>신청 승인</Button>
        <Button
          onClick={handleReject}
          type={rejectionDetail === "" ? "disabled" : "default"}
        >
          신청 반려
        </Button>
      </FlexWrapper>
    </Card>
  );
};

export default ExecutiveActivityReportApprovalSection;
