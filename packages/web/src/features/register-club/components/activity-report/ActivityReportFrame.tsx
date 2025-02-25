import { overlay } from "overlay-kit";
import React from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ActivityReportList from "@sparcs-clubs/web/features/register-club/components/activity-report/ActivityReportList";
import { useGetActivityReportsForPromotional } from "@sparcs-clubs/web/features/register-club/services/useGetActivityReportsForPromotional";

import CreateActivityReportModal from "./CreateActivityReportModal";

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

const StyledCard = styled(Card)`
  margin-left: 20px;
  overflow: hidden;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ActivityReportFrame: React.FC<ActivityReportFrameProps> = ({
  clubId,
}) => {
  const { profile } = useAuth();
  const { data, isLoading, isError, refetch } =
    useGetActivityReportsForPromotional({
      clubId,
    });

  const openCreateActivityReportModal = () => {
    overlay.open(({ isOpen, close }) => (
      <CreateActivityReportModal
        clubId={clubId}
        isOpen={isOpen}
        close={close}
        refetch={refetch}
      />
    ));
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>가등록 / 등록 취소 기간 활동 보고서</SectionTitle>
      <StyledCard outline gap={32}>
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
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <ActivityReportList
            data={data?.activities ?? []}
            profile={profile?.type ?? ""}
            refetch={refetch}
            clubId={clubId}
          />
        </AsyncBoundary>
      </StyledCard>
    </FlexWrapper>
  );
};

export default ActivityReportFrame;
