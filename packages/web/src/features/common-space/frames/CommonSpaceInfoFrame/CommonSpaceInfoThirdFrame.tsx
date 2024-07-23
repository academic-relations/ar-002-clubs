import React, { useEffect } from "react";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { ko } from "date-fns/locale";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

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

const CommonSpaceInfoThirdFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ commonSpace, setNextEnabled }) => {
  const { email, clubId, startTerm, endTerm } = commonSpace.body;
  const { spaceId } = commonSpace.param;
  const correct = email && clubId && startTerm && endTerm && spaceId;

  useEffect(() => {
    setNextEnabled(!!correct);
  }, [correct, setNextEnabled]);

  return correct ? (
    <>
      <Card outline gap={20}>
        <CardInner>
          <Typography fs={16} lh={20} fw="MEDIUM">
            신청자 정보
          </Typography>
          <StyledList>
            <li>동아리: {commonSpace.userInfo?.clubName}</li>
            <li>담당자: {commonSpace.userInfo?.name}</li>
            <li>연락처: {commonSpace.userInfo?.phoneNumber}</li>
          </StyledList>
        </CardInner>
        <ReservationInfo>
          <Typography fs={16} lh={20} fw="MEDIUM">
            예약 공간
          </Typography>
          <Typography fs={16} lh={20} fw="REGULAR">
            {commonSpace.spaceName},{" "}
            {format(startTerm, "M/d(E) ", { locale: ko })}
            {format(startTerm, "HH:mm", { locale: ko })} ~
            {format(endTerm, "HH:mm", { locale: ko })} (
            {`${differenceInHours(endTerm, startTerm)}시간`}
            {differenceInMinutes(endTerm, startTerm) % 60
              ? ` ${differenceInMinutes(endTerm, startTerm) % 60}분`
              : ""}
            )
          </Typography>
        </ReservationInfo>
      </Card>
      <Info text="먼가 넣을 것이 없을까나" />
    </>
  ) : null;
};

export default CommonSpaceInfoThirdFrame;
