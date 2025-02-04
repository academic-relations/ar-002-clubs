import React, { useState } from "react";

import { useParams } from "next/navigation";

import { overlay } from "overlay-kit";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import UnitInput from "@sparcs-clubs/web/common/components/Forms/UnitInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import useExecutiveApproveActivityReport from "@sparcs-clubs/web/features/activity-report/hooks/useExecutiveApproveActivityReport";
import useExecutiveRejectActivityReport from "@sparcs-clubs/web/features/activity-report/hooks/useExecutiveRejectActivityReport";
import { Comment } from "@sparcs-clubs/web/features/activity-report/types/activityReport";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

const ExecutiveFundingReviewSection: React.FC<{
  comments: Comment[];
  expenditureAmount: number;
}> = ({ comments, expenditureAmount }) => {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);

  const { profile } = useAuth();

  const { mutate: approveFunding } =
    useExecutiveApproveActivityReport(activityId);
  const { mutate: rejectFunding } =
    useExecutiveRejectActivityReport(activityId);
  const [rejectionDetail, setRejectionDetail] = useState("");
  const [approveAmount, setApproveAmount] = useState("");

  const handleApprove = () => {
    approveFunding(undefined, {
      onSuccess: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              지원금 신청 승인이 완료되었습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
      onError: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              지원금 신청 승인에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  };

  const handleReject = () => {
    rejectFunding(rejectionDetail, {
      onSuccess: () => {
        setRejectionDetail("");
      },
      onError: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              지원금 신청 반려에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  };

  if (profile?.type !== "executive") {
    return null;
  }

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
        label="부분 승인 / 반려 사유 (부분 승인 / 반려 시에만 입력)"
        value={rejectionDetail}
        handleChange={setRejectionDetail}
        placeholder="내용"
        area
      />

      <FlexWrapper direction="row" gap={16} style={{ height: "36px" }}>
        <Typography
          fs={16}
          lh={36}
          fw="MEDIUM"
          style={{ whiteSpace: "nowrap" }}
        >
          승인 금액
        </Typography>
        <UnitInput
          value={approveAmount}
          handleChange={setApproveAmount}
          unit={`/ ${expenditureAmount}원`}
          placeholder="금액을 입력해주세요"
          required={false}
        />
        <Button
          type={
            approveAmount === "" || Number(approveAmount) > expenditureAmount
              ? "disabled"
              : "default"
          }
          onClick={handleApprove}
        >
          신청 승인
        </Button>
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

export default ExecutiveFundingReviewSection;
