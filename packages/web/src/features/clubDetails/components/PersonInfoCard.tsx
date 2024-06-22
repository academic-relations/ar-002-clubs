"use client";

import React from "react";

import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

import Card from "@sparcs-clubs/web/common/components/Card";

import PersonInfoItem from "./PersonInfoItem";

interface PersonInfoCardProps {
  club: ApiClb002ResponseOK;
}

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({ club }) => (
  <Card gap={16} padding="16px 20px">
    <PersonInfoItem title="총원" content={`${club.totalMemberCnt}명`} />
    <PersonInfoItem title="대표자" content={club.representative} />
    <PersonInfoItem
      title="지도교수"
      content={club.advisor ? club.advisor : "-"}
    />
  </Card>
);

export default PersonInfoCard;
