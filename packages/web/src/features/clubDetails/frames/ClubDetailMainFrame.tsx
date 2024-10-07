"use client";

import React from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";

import { RegisterInfo } from "../components/RegisterInfo";
import { useGetMyMemberRegistration } from "../services/getMyMemberRegistration";

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

  const {
    data: myRegistrationList,
    isLoading,
    isError,
    refetch,
  } = useGetMyMemberRegistration();

  let isInClub = RegistrationApplicationStudentStatusEnum.Rejected;
  let isRegistered = false;
  if (myRegistrationList && myRegistrationList.applies.length > 0) {
    const thisRegistration = myRegistrationList.applies.find(
      apply => apply.clubId === club.id,
    );
    if (thisRegistration) {
      isInClub = thisRegistration.applyStatusEnumId;
      isRegistered = true;
    } else {
      isRegistered = false;
    }
  }

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={60}>
        <PageHead
          items={[
            { name: "동아리 목록", path: "/clubs" },
            { name: club.name_kr, path: `/clubs/${club.id}` },
          ]}
          title={club.name_kr}
          action={
            isLoggedIn &&
            isRegistrationPeriod && (
              <RegisterInfo
                club={club}
                isInClub={isInClub}
                isRegistered={isRegistered}
                refetch={refetch}
                myRegistrationList={myRegistrationList ?? { applies: [] }}
              />
            )
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
    </AsyncBoundary>
  );
};

export default ClubDetailMainFrame;
