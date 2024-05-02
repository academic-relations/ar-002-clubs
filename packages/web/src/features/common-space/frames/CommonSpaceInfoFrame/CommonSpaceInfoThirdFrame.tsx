import React from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";

import { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

const StyledTypography = styled(Typography)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  padding-left: 20px;
`;

const ReservationInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const CommonSpaceInfoThirdFrame: React.FC<CommonSpaceFrameProps> = () => (
  <>
    <StyledCard type="outline">
      <CardInner>
        <StyledTypography type="p">신청자 정보</StyledTypography>
        <StyledList>
          <li>동아리: 술박스</li>
          <li>담장자: 이지윤</li>
          <li>연락처: 010-9612-4975</li>
        </StyledList>
      </CardInner>
      <ReservationInfo>
        <Typography type="p_b">예약 공간</Typography>
        <Typography type="p">
          제1공용동아리방 (태울관 2101호), 3/27(수) 17:00 ~ 20:00 (3시간)
        </Typography>
      </ReservationInfo>
    </StyledCard>
    <Info text="먼가 넣을 것이 없을까나" />
  </>
);

export default CommonSpaceInfoThirdFrame;
