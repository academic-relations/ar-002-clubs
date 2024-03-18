"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";

interface PersonInfoCardProps {
  club: ClubDetail;
}

const PersonInfoCardInner = styled(Card)`
  gap: 16px;
`;

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({ club }) => (
  <PersonInfoCardInner>{club.representative}</PersonInfoCardInner>
);

export default PersonInfoCard;
