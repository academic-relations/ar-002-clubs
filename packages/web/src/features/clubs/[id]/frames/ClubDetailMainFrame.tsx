"use client";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import React from "react";
import styled from "styled-components";
import { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";
import ClubInfoCard from "@sparcs-clubs/web/features/clubs/[id]/components/ClubInfoCard";
import PersonInfoCard from "@sparcs-clubs/web/features/clubs/[id]/components/PersonInfoCard";
import ClubDetailCard from "@sparcs-clubs/web/features/clubs/[id]/components/ClubDetailCard";

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

const MoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
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

interface ClubDetailMainFrameProps {
  club: ClubDetail;
}

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({ club }) => (
  <ClubDetailMainFrameInner>
    <PageTitle>{club.name}</PageTitle>

    <ClubInfoWrapper>
      <SectionTitle>동아리 정보</SectionTitle>
      <ClubInfoCard club={club} />
    </ClubInfoWrapper>

    <MoreInfoWrapper>
      <PersonInfoWrapper>
        <SectionTitle>인적 사항 </SectionTitle>
        <PersonInfoCard club={club} />
      </PersonInfoWrapper>
      <ClubDetailWrapper>
        <SectionTitle>동아리 설명</SectionTitle>
        <ClubDetailCard club={club} />
      </ClubDetailWrapper>
    </MoreInfoWrapper>
  </ClubDetailMainFrameInner>
);

export default ClubDetailMainFrame;
