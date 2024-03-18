"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";
// import {
//   getClubType,
//   getTagColorFromClubType,
// } from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";

interface ClubInfoCardProps {
  club: ClubDetail;
}

const ClubInfoCardInner = styled(Card)`
  gap: 16px;
`;

const ClubInfoCard: React.FC<ClubInfoCardProps> = ({ club }) => (
  <ClubInfoCardInner>{club.name}</ClubInfoCardInner>
);

export default ClubInfoCard;
