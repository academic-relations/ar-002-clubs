"use client";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import React from "react";
import styled from "styled-components";

import ClubInfoCard from "@sparcs-clubs/web/features/clubDetails/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubDetails/components/PersonInfoCard";
import ClubDetailCard from "@sparcs-clubs/web/features/clubDetails/components/ClubDetailCard";
import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb/BreadCrumb";

interface ClubDetailMainFrameProps {
  club: ApiClb002ResponseOK;
}
const ClubDetailMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ClubInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardWrapper = styled.div`
  padding-left: 20px;
`;

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const PersonInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ClubDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 0 0;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({ club }) => (
  <ClubDetailMainFrameInner>
    <PageHeadWrapper>
      <BreadCrumb
        items={[
          { name: "동아리 목록", path: "/clubs" },
          { name: club.name, path: `/clubs/${club.id}` },
        ]}
      />
      <PageTitle>{club.name}</PageTitle>
    </PageHeadWrapper>

    <ClubInfoWrapper>
      <SectionTitle size="lg">동아리 정보</SectionTitle>
      <CardWrapper>
        <ClubInfoCard club={club} />
      </CardWrapper>
    </ClubInfoWrapper>

    <MoreInfoWrapper>
      <PersonInfoWrapper>
        <SectionTitle size="lg">인적 사항 </SectionTitle>
        <CardWrapper>
          <PersonInfoCard club={club} />
        </CardWrapper>
      </PersonInfoWrapper>

      <ClubDetailWrapper>
        <SectionTitle size="lg">동아리 설명</SectionTitle>
        <CardWrapper>
          <ClubDetailCard club={club} />
        </CardWrapper>
      </ClubDetailWrapper>
    </MoreInfoWrapper>
  </ClubDetailMainFrameInner>
);

export default ClubDetailMainFrame;
