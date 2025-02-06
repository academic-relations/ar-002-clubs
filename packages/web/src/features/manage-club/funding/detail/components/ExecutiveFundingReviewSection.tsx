import React, { useState } from "react";

import { IFundingCommentResponse } from "@sparcs-clubs/interface/api/funding/type/funding.comment.type";
import { IFundingResponse } from "@sparcs-clubs/interface/api/funding/type/funding.type";
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
import { FundingTagList } from "@sparcs-clubs/web/constants/tableTagList";
import useExecutiveReviewFunding from "@sparcs-clubs/web/features/manage-club/funding/services/useExecutiveReviewFunding";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const ExecutiveFundingReviewSection: React.FC<{
  funding: IFundingResponse;
  comments: IFundingCommentResponse[];
}> = ({ funding, comments }) => {
  const { id } = useParams<{ id: string }>();
  const fundingId = Number(id);

  const { profile } = useAuth();

  const { mutate: reviewFunding } = useExecutiveReviewFunding(fundingId);
  const [reviewDetail, setReviewDetail] = useState("");
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
        content: reviewDetail,
      },
      {
        onSuccess: () => {
          setReviewDetail("");
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
        content: reviewDetail,
      },
      {
        onSuccess: () => {
          setReviewDetail("");
          setApproveAmount("");
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
    if (reviewDetail === "") return false;
    return true;
  };

  const filteredComments = comments.filter(
    comment => comment.content.trim() !== "",
  );

  return (
    <Card outline padding="32px" gap={20}>
      {filteredComments.length > 0 && (
        <FlexWrapper direction="column" gap={8}>
          {filteredComments.map((comment, index) => (
            <FlexWrapper direction="column" gap={4} key={`${index.toString()}`}>
              <Typography fs={14} lh={16} color="GRAY.600">
                {formatSlashDateTime(comment.createdAt)} •{" "}
                {getTagDetail(comment.fundingStatusEnum, FundingTagList).text}
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
        value={reviewDetail}
        handleChange={setReviewDetail}
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
          unitOnClick={() =>
            setApproveAmount(funding.expenditureAmount.toString())
          }
        />
        <Button
          type={availableToApprove() ? "default" : "disabled"}
          onClick={handleApprove}
        >
          신청 승인
        </Button>
        <Button
          onClick={handleReject}
          type={reviewDetail === "" ? "disabled" : "default"}
        >
          신청 반려
        </Button>
      </FlexWrapper>
    </Card>
  );
};

export default ExecutiveFundingReviewSection;
