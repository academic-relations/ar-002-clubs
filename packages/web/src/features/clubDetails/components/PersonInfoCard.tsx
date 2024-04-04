"use client";

import React from "react";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import PersonInfoItem from "./PersonInfoItem";

interface PersonInfoCardProps {
  club: ApiClb002ResponseOK;
}

const PersonInfoCardInner = styled(Card)`
  gap: 16px;
`;

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({ club }) => (
  <PersonInfoCardInner>
    <PersonInfoItem title="총원" content={`${club.totalMemberCnt}명`} />
    <PersonInfoItem title="대표자" content={club.representative} />
    <PersonInfoItem
      title="지도교수"
      content={club.advisor ? club.advisor : "-"}
    />
  </PersonInfoCardInner>
);

export default PersonInfoCard;
