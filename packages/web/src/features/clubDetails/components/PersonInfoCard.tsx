"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface PersonInfoCardProps {
  club: ApiClb002ResponseOK;
  isRegistrationPeriod: boolean;
}

const StyledCard = styled(Card)`
  width: fit-content;
  min-width: 300px;
  max-width: 100%;
  padding: 16px 20px !important;
  gap: 40px;
  flex-direction: row;
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
  }
`;

const PersonInfoTitileWrapper = styled(FlexWrapper)`
  width: 120px;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 106px;
  }
`;
const PersonInfoContentsWrapper = styled(FlexWrapper)`
  display: flex;
  width: 100%;
  min-width: 120px;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const PersonInfoTiltie = styled(Typography)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 16px;
  line-height: 24px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const PersonInfoContents = styled(Typography)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 20px;
    width: 100%;
  }
  width: 100%;
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  flex-grow: 1;
  min-width: 0;
  position: relative;
`;

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({
  club,
  isRegistrationPeriod,
}) => (
  <StyledCard>
    <PersonInfoTitileWrapper direction="column" gap={16}>
      <PersonInfoTiltie>총원</PersonInfoTiltie>
      <PersonInfoTiltie>대표자</PersonInfoTiltie>
      <PersonInfoTiltie>지도교수</PersonInfoTiltie>
    </PersonInfoTitileWrapper>
    <PersonInfoContentsWrapper direction="column" gap={16}>
      <PersonInfoContents>
        {isRegistrationPeriod ? "-" : `${club.totalMemberCnt}명`}
      </PersonInfoContents>
      <PersonInfoContents>{club.representative}</PersonInfoContents>
      <PersonInfoContents>
        {club.advisor === null ||
        club.advisor === undefined ||
        club.advisor === "null" ||
        club.advisor === "undefined" ||
        club.advisor === ""
          ? "-"
          : club.advisor}
      </PersonInfoContents>
    </PersonInfoContentsWrapper>
  </StyledCard>
);

export default PersonInfoCard;
