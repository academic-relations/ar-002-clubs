import React, { useState } from "react";

import { ApiFnd012ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd012";

import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
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
import useExecutiveReviewFunding from "@sparcs-clubs/web/features/manage-club/funding/services/useExecutiveReviewFunding";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

const ExecutiveFundingReviewSection: React.FC<{
  funding: ApiFnd012ResponseOk;
}> = ({ funding }) => {
  const { id } = useParams<{ id: string }>();
  const fundingId = Number(id);

  const { profile } = useAuth();

  const { mutate: reviewFunding } = useExecutiveReviewFunding(fundingId);
  const [rejectionDetail, setRejectionDetail] = useState("");
  const [approveAmount, setApproveAmount] = useState(
    funding.approvedAmount !== 0 ? funding.approvedAmount?.toString() : "",
  );

  const handleApprove = () => {
    reviewFunding(
      {
        approvedAmount: Number(approveAmount),
        fundingStatusEnum:
          Number(approveAmount) === funding.expenditureAmount
            ? FundingStatusEnum.Approved
            : FundingStatusEnum.Partial,
        content: rejectionDetail,
      },
      {
        onSuccess: () => {
          overlay.open(({ isOpen, close }) => (
            <Modal isOpen={isOpen}>
              <ConfirmModalContent onConfirm={close}>
                지원금 신청{" "}
                {Number(approveAmount) === funding.expenditureAmount
                  ? "승인"
                  : "부분 승인"}
                이 완료되었습니다.
              </ConfirmModalContent>
            </Modal>
          ));
        },
        onError: () => {
          overlay.open(({ isOpen, close }) => (
            <Modal isOpen={isOpen}>
              <ConfirmModalContent onConfirm={close}>
                지원금 신청{" "}
                {Number(approveAmount) === funding.expenditureAmount
                  ? "승인"
                  : "부분 승인"}
                에 실패했습니다.
              </ConfirmModalContent>
            </Modal>
          ));
        },
      },
    );
  };

  const handleReject = () => {
    reviewFunding(
      {
        approvedAmount: 0,
        fundingStatusEnum: FundingStatusEnum.Rejected,
        content: rejectionDetail,
      },
      {
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
      },
    );
  };

  if (profile?.type !== "executive") {
    return null;
  }

  const availableToApprove: () => boolean = () => {
    if (Number(approveAmount) === 0) return false;
    if (Number(approveAmount) > funding.expenditureAmount) return false;
    if (Number(approveAmount) === funding.approvedAmount) return false;
    if (Number(approveAmount) === funding.expenditureAmount) return true;
    if (rejectionDetail === "") return false;
    return true;
  };

  return (
    <Card outline padding="32px" gap={20}>
      {funding.comments.length > 0 && (
        <FlexWrapper direction="column" gap={8}>
          {funding.comments.map((comment, index) => (
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
          unit={`/ ${funding.expenditureAmount}원`}
          placeholder="금액을 입력해주세요"
          required={false}
        />
        <Button
          type={availableToApprove() ? "default" : "disabled"}
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
