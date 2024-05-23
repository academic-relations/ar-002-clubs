"use client";

import React from "react";
import styled from "styled-components";

import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import Card from "@sparcs-clubs/web/common/components/Card";

interface ClubDetailCardProps {
  club: ApiClb002ResponseOK;
}

const ClubDetailText = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
`;

const ClubDetailCard: React.FC<ClubDetailCardProps> = ({ club }) => (
  <Card gap={10} padding="16px 20px">
    <ClubDetailText>{club.description}</ClubDetailText>
  </Card>
);

export default ClubDetailCard;
