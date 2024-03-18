"use client";

import Card from "@sparcs-clubs/web/common/components/Card";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import React from "react";
import styled from "styled-components";

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

const clubDetail = {
  id: 1,
  name: "궁극의 맛",
  type: "정동아리\n",
  characteristic: "요리",
  representative: "장주원",
  advisor: null,
  totalMembers: 1,
  divisionName: "생활문화",
  foundingYear: 2015,
  room: "학부학생회관별관(N12) 3101호",
};
// 인적사항 personInfo
interface ClubDetailMainFrameProps {
  clubID: string;
}

const ClubDetailMainFrame: React.FC<ClubDetailMainFrameProps> = ({
  clubID,
}) => (
  <ClubDetailMainFrameInner>
    <PageTitle>{clubDetail.name}</PageTitle>
    <ClubInfoWrapper>
      <SectionTitle>동아리 정보</SectionTitle>
      <Card>clubinfo</Card>
    </ClubInfoWrapper>
    <MoreInfoWrapper>
      <ClubInfoWrapper>
        <SectionTitle>인적 사항 </SectionTitle>
        <Card>clubinfo</Card>
      </ClubInfoWrapper>
      <ClubInfoWrapper>
        <SectionTitle>동아리 설명</SectionTitle>
        <Card>clubinfo</Card>
      </ClubInfoWrapper>
    </MoreInfoWrapper>
    {clubID}
  </ClubDetailMainFrameInner>
);

export default ClubDetailMainFrame;
