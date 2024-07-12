"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
}

const CardWrapper = styled.div`
  padding-left: 20px;
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    flex-direction: column;
  }
`;

const ClubDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 0 0;
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({ club }) => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "동아리 목록", path: "/clubs" },
        { name: club.name, path: `/clubs/${club.id}` },
      ]}
      title={club.name}
    />
    <FlexWrapper direction="column" gap={20}>
      <SectionTitle size="lg">동아리 정보</SectionTitle>
      <CardWrapper>
        <ClubInfoCard club={club} />
      </CardWrapper>
    </FlexWrapper>

    <MoreInfoWrapper>
      <FlexWrapper direction="column" gap={20}>
        <SectionTitle size="lg">인적 사항 </SectionTitle>
        <CardWrapper>
          <PersonInfoCard club={club} />
        </CardWrapper>
      </FlexWrapper>

      <ClubDetailWrapper>
        <SectionTitle size="lg">동아리 설명</SectionTitle>
        <CardWrapper>
          <ClubDetailCard club={club} />
        </CardWrapper>
      </ClubDetailWrapper>
    </MoreInfoWrapper>
  </FlexWrapper>
);

export default ClubDetailMainFrame;
