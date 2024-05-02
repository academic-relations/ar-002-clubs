import React from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { ko } from "date-fns/locale";
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

const CommonSpaceInfoThirdFrame: React.FC<CommonSpaceFrameProps> = ({
  commonSpace,
}) => {
  const { start, end } = commonSpace.reservation!;
  const diffHours = differenceInHours(end, start);
  const diffMinutes = differenceInMinutes(end, start);

  return (
    <>
      <StyledCard type="outline">
        <CardInner>
          <StyledTypography type="p">신청자 정보</StyledTypography>
          <StyledList>
            <li>동아리: {commonSpace.info?.clubName}</li>
            <li>담장자: {commonSpace.info?.applicant}</li>
            <li>연락처: {commonSpace.info?.phone}</li>
          </StyledList>
        </CardInner>
        <ReservationInfo>
          <Typography type="p_b">예약 공간</Typography>
          <Typography type="p">
            {commonSpace.space}, {format(start, "M/d(E) ", { locale: ko })}
            {format(start, "HH:mm", { locale: ko })} ~
            {format(end, "HH:mm", { locale: ko })} ({`${diffHours}시간`}
            {diffMinutes! % 60 ? ` ${diffMinutes! % 60}분` : ""})
          </Typography>
        </ReservationInfo>
      </StyledCard>
      <Info text="먼가 넣을 것이 없을까나" />
    </>
  );
};

export default CommonSpaceInfoThirdFrame;
