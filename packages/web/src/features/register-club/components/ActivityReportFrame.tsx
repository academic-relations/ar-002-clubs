import React from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import PastActivityReportList from "@sparcs-clubs/web/features/manage-club/activity-report/components/PastActivityReportList";

import { useGetActivityReportsForPromotional } from "../services/useGetActivityReportsForPromotional";

import CreateActivityReportModal from "./_atomic/CreateActivityReportModal";

interface ActivityReportFrameProps {
  clubId: number;
}

const OptionOuter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const ActivityReportFrame: React.FC<ActivityReportFrameProps> = ({
  clubId,
}) => {
  const { data, isLoading, isError } = useGetActivityReportsForPromotional({
    clubId,
  });

  const openCreateActivityReportModal = () => {
    overlay.open(({ isOpen, close }) => (
      <CreateActivityReportModal
        clubId={clubId}
        isOpen={isOpen}
        close={close}
      />
    ));
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={40}>
        <SectionTitle>가등록 / 등록 취소 기간 활동 보고서</SectionTitle>
        <Card outline gap={32} style={{ marginLeft: 20 }}>
          <OptionOuter>
            <Typography
              fs={14}
              fw="REGULAR"
              lh={20}
              color="GRAY.300"
              ff="PRETENDARD"
            >
              활동 보고서는 최대 20개까지 작성 가능합니다
            </Typography>
            <IconButton
              type="default"
              icon="add"
              onClick={openCreateActivityReportModal}
            >
              활동 보고서 작성
            </IconButton>
          </OptionOuter>
          <PastActivityReportList data={data?.activities ?? []} />
        </Card>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ActivityReportFrame;
