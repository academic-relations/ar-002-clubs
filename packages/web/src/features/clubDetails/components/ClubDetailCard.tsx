"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubDetailCardProps {
  club: ApiClb002ResponseOK;
}

const ClubDetailText = styled.div<{ text: string }>`
  width: 100%;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
  ${props =>
    props.text === "" &&
    `
    
    color: gray;`}

  &:before {
    content: "${props =>
      props.text === "" ? "등록된 동아리 설명이 없습니다." : props.text}";
  }
`;

const ClubDetailCard: React.FC<ClubDetailCardProps> = ({ club }) => (
  <Card gap={16} padding="16px 20px">
    <ClubDetailText text={club.description} />
  </Card>
);

export default ClubDetailCard;
