import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React, { useMemo } from "react";
import styled from "styled-components";

import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import NotFound from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import { useDeleteFunding } from "@sparcs-clubs/web/features/manage-club/funding/services/useDeleteFunding";
import { useGetFunding } from "@sparcs-clubs/web/features/manage-club/funding/services/useGetFunding";
import useGetFundingDeadline from "@sparcs-clubs/web/features/manage-club/funding/services/useGetFundingDeadline";
import { newFundingListQueryKey } from "@sparcs-clubs/web/features/manage-club/funding/services/useGetNewFundingList";
import { isActivityReportUnverifiable } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

import BasicEvidenceList from "../components/BasicEvidenceList";
import FixtureEvidenceList from "../components/FixtureEvidenceList";
import FundingInfoList from "../components/FundingInfoList";
import FundingStatusSection from "../components/FundingStatusSection";
import NonCorpEvidenceList from "../components/NonCorpEvidenceList";
import OtherEvidenceList from "../components/OtherEvidenceList";
import TransportationEvidenceList from "../components/TransportationEvidenceList";

interface FundingDetailFrameProps {
  clubId: number;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FundingDetailFrame: React.FC<FundingDetailFrameProps> = ({ clubId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetFunding(+id);
  const { funding, comments } = data ?? {};
  const { mutate: deleteFunding } = useDeleteFunding();

  const {
    data: fundingDeadline,
    isLoading: isLoadingFundingDeadline,
    isError: isErrorFundingDeadline,
  } = useGetFundingDeadline();

  const onClick = () => {
    router.push("/manage-club/funding");
  };

  const openEditModal = () => {
    if (funding?.fundingStatusEnum === FundingStatusEnum.Applied) {
      router.push(`/manage-club/funding/${id}/edit`);
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            router.push(`/manage-club/funding/${id}/edit`);
          }}
          onClose={close}
        >
          지원금 신청 내역을 수정하면 신청 상태가 모두 초기화 됩니다.
          <br />
          수정하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const openDeleteModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            deleteFunding(
              { requestParam: { id: Number(id) } },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: newFundingListQueryKey(clubId),
                  });
                  close();
                  router.replace("/manage-club/funding");
                },
              },
            );
          }}
          onClose={close}
        >
          지원금 신청 내역을 삭제하면 복구할 수 없습니다.
          <br />
          삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const isPastFunding = useMemo(() => {
    if (
      !fundingDeadline ||
      !fundingDeadline.targetDuration ||
      !funding?.expenditureDate
    ) {
      return false;
    }

    return (
      new Date(funding.expenditureDate) <
      new Date(fundingDeadline.targetDuration.startTerm)
    );
  }, [fundingDeadline, funding?.expenditureDate]);

  if (isError) {
    return <NotFound />;
  }

  if (!funding || !clubId) {
    return <AsyncBoundary isLoading={isLoading} isError={isError} />;
  }

  return (
    <FlexWrapper direction="column" gap={40}>
      <Card outline>
        {!isPastFunding && (
          <FundingStatusSection
            status={funding.fundingStatusEnum}
            editedAt={funding.editedAt}
            commentedAt={funding.commentedAt}
            comments={comments?.toReversed() ?? []}
          />
        )}
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <FundingInfoList data={funding} />
          <BasicEvidenceList data={funding} />
          {(!funding.purposeActivity ||
            isActivityReportUnverifiable(funding.purposeActivity.id)) && (
            <FixtureEvidenceList data={funding} />
          )}
          {funding.isFixture && (
            <FixtureEvidenceList isFixture data={funding} />
          )}
          {funding.isTransportation && (
            <TransportationEvidenceList data={funding} />
          )}
          {funding.isNonCorporateTransaction && (
            <NonCorpEvidenceList data={funding} />
          )}
          {funding.isFoodExpense && (
            <OtherEvidenceList
              content="식비"
              explanation={funding.foodExpense?.explanation}
              fileList={funding.foodExpense?.files}
            />
          )}
          {funding.isLaborContract && (
            <OtherEvidenceList
              content="근로 계약"
              explanation={funding.laborContract?.explanation}
              fileList={funding.laborContract?.files}
            />
          )}
          {funding.isExternalEventParticipationFee && (
            <OtherEvidenceList
              content="외부 행사 참가비"
              explanation={funding.externalEventParticipationFee?.explanation}
              fileList={funding.externalEventParticipationFee?.files}
            />
          )}
          {funding.isPublication && (
            <OtherEvidenceList
              content="발간물"
              explanation={funding.publication?.explanation}
              fileList={funding.publication?.files}
            />
          )}
          {funding.isProfitMakingActivity && (
            <OtherEvidenceList
              content="수익 사업"
              explanation={funding.profitMakingActivity?.explanation}
              fileList={funding.profitMakingActivity?.files}
            />
          )}
          {funding.isJointExpense && (
            <OtherEvidenceList
              content="공동 경비"
              explanation={funding.jointExpense?.explanation}
              fileList={funding.jointExpense?.files}
            />
          )}
          {funding.isEtcExpense && (
            <OtherEvidenceList
              content="기타"
              explanation={funding.etcExpense?.explanation}
              fileList={funding.etcExpense?.files}
            />
          )}
        </AsyncBoundary>
      </Card>
      <ButtonWrapper>
        <Button type="default" onClick={onClick}>
          목록으로 돌아가기
        </Button>
        <AsyncBoundary
          isLoading={isLoadingFundingDeadline}
          isError={isErrorFundingDeadline}
        >
          {!isPastFunding && (
            <FlexWrapper direction="row" gap={10}>
              <Button type="default" onClick={openDeleteModal}>
                삭제
              </Button>
              <Button type="default" onClick={openEditModal}>
                수정
              </Button>
            </FlexWrapper>
          )}
        </AsyncBoundary>
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default FundingDetailFrame;
