"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";

interface ClubDetailCardProps {
  club: ClubDetail;
}

const PersonInfoCardInner = styled(Card)`
  gap: 16px;
`;

const ClubDetailCard: React.FC<ClubDetailCardProps> = ({ club }) => (
  <PersonInfoCardInner>{club.id}</PersonInfoCardInner>
);

export default ClubDetailCard;
