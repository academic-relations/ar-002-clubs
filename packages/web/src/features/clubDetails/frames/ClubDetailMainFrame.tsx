"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";

import { RegisterInfo } from "../components/RegisterInfo";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
  isRegistrationPeriod: boolean;
}

const CardWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    padding-left: 16px;
  }
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const PersonInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  max-width: 50%;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: 100%;
    max-width: 100%;
  }
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({
  club,
  isRegistrationPeriod,
}) => {
  const { isLoggedIn } = useAuth();

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "동아리 목록", path: "/clubs" },
          { name: club.name_kr, path: `/clubs/${club.id}` },
        ]}
        title={club.name_kr}
        action={
          isLoggedIn && isRegistrationPeriod && <RegisterInfo club={club} />
        }
      />

      <FlexWrapper direction="column" gap={20}>
        <SectionTitle size="lg">동아리 정보</SectionTitle>
        <CardWrapper>
          <ClubInfoCard club={club} />
        </CardWrapper>
      </FlexWrapper>

      <MoreInfoWrapper>
        <PersonInfoWrapper>
          <SectionTitle size="lg">인적 사항 </SectionTitle>
          <CardWrapper>
            <PersonInfoCard
              club={club}
              isRegistrationPeriod={isRegistrationPeriod}
            />
          </CardWrapper>
        </PersonInfoWrapper>

        <FlexWrapper direction="column" gap={20} style={{ flex: "1 0 0" }}>
          <SectionTitle size="lg">동아리 설명</SectionTitle>
          <CardWrapper>
            <ClubDetailCard club={club} />
          </CardWrapper>
        </FlexWrapper>
      </MoreInfoWrapper>
    </FlexWrapper>
  );
};

export default ClubDetailMainFrame;
