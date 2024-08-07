import React from "react";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import IconButton from "@sparcs-clubs/web/common/components/Forms/IconButton";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockPastActivityData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import PastActivityReportList from "@sparcs-clubs/web/features/manage-club/activity-report/components/PastActivityReportList";

import CreateActivityReportModal from "./_atomic/CreateActivityReportModal";

const OptionOuter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const ActivityReportFrame: React.FC = () => {
  const openCreateActivityReportModal = () => {
    overlay.open(({ isOpen, close }) => (
      <CreateActivityReportModal isOpen={isOpen} close={close} />
    ));
  };

  return (
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
            buttonText="활동 보고서 작성"
            iconType="add"
            onClick={openCreateActivityReportModal}
          >
            활동 보고서 작성
          </IconButton>
        </OptionOuter>
        <PastActivityReportList data={mockPastActivityData} />
      </Card>
    </FlexWrapper>
  );
};

export default ActivityReportFrame;