import React from "react";

import { useRouter } from "next/navigation";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/service/_mock/mockFundingDetail";

import BasicEvidenceList from "../components/BasicEvidenceList";
import FixtureEvidenceList from "../components/FixtureEvidenceList";
import FundingInfoList from "../components/FundingInfoList";
import NonCorpEvidenceList from "../components/NonCorpEvidenceList";
import OtherEvidenceList from "../components/OtherEvidenceList";
import TransportationEvidenceList from "../components/TransportationEvidenceList";

import { openDeleteModal, openEditModal } from "./_atomic/fundingDetailModal";

interface FundingDetailFrameProps {
  isNow: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FundingDetailFrame: React.FC<FundingDetailFrameProps> = ({ isNow }) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/manage-club/funding");
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <Card outline>
        {isNow && (
          <ProgressStatus
            labels={["신청 완료", "동아리 연합회 승인 대기"]}
            progress={[{ status: Status.Approved, date: new Date() }]}
            // TODO: 반려일 경우 optional에 RejectReasonToast 추가
          />
        )}
        <FundingInfoList />
        <BasicEvidenceList />
        {mockFundingDetail.purposeId === 0 && <FixtureEvidenceList />}
        {mockFundingDetail.isFixture && <FixtureEvidenceList isFixture />}
        {mockFundingDetail.isTransportation && <TransportationEvidenceList />}
        {mockFundingDetail.isNonCorporateTransaction && <NonCorpEvidenceList />}
        {mockFundingDetail.isFoodExpense && (
          <OtherEvidenceList
            content="식비"
            explanation={mockFundingDetail.foodExpenseExplanation ?? ""}
          />
        )}
        {mockFundingDetail.isLaborContract && (
          <OtherEvidenceList
            content="근로 계약"
            explanation={mockFundingDetail.laborContractExplanation ?? ""}
          />
        )}
        {mockFundingDetail.isExternalEventParticipationFee && (
          <OtherEvidenceList
            content="외부 행사 참가비"
            explanation={
              mockFundingDetail.externalEventParticipationFeeExplanation ?? ""
            }
          />
        )}
        {mockFundingDetail.isPublication && (
          <OtherEvidenceList
            content="발간물"
            explanation={mockFundingDetail.publicationExplanation ?? ""}
          />
        )}
        {mockFundingDetail.isProfitMakingActivity && (
          <OtherEvidenceList
            content="수익 사업"
            explanation={
              mockFundingDetail.profitMakingActivityExplanation ?? ""
            }
          />
        )}
        {mockFundingDetail.isJointExpense && (
          <OtherEvidenceList
            content="공동 경비"
            explanation={mockFundingDetail.jointExpenseExplanation ?? ""}
          />
        )}
        {mockFundingDetail.isEtcExpense && (
          <OtherEvidenceList
            content="기타"
            explanation={mockFundingDetail.etcExpenseExplanation ?? ""}
          />
        )}
      </Card>
      <ButtonWrapper>
        <Button type="default" onClick={onClick}>
          목록으로 돌아가기
        </Button>
        {isNow && (
          <FlexWrapper direction="row" gap={10}>
            <Button type="default" onClick={openDeleteModal}>
              삭제
            </Button>
            <Button type="default" onClick={openEditModal}>
              수정
            </Button>
          </FlexWrapper>
        )}
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default FundingDetailFrame;
