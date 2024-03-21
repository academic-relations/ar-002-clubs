"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";

interface ClubDetailCardProps {
  club: ClubDetail;
}

const ClubDetailCardInner = styled(Card)`
  gap: 10px;
`;

const ClubDetailText = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
`;

const ClubDetailCard: React.FC<ClubDetailCardProps> = ({ club }) => (
  <ClubDetailCardInner>
    <ClubDetailText>{club.description}</ClubDetailText>
  </ClubDetailCardInner>
);

export default ClubDetailCard;
