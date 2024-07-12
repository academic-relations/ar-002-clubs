"use client";

import React from "react";

import styled from "styled-components";

interface ClubInfoItemProps {
  title: string;
  content: React.ReactNode;
}

const ClubInfoItemInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  font-size: 16px;
  line-height: 24px;
`;

const ClubInfoTitle = styled(ClubInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  width: 120px;
  justify-content: center;
`;

const ClubInfoContent = styled(ClubInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  display: fill;
`;

const ClubInfoItem: React.FC<ClubInfoItemProps> = ({ title, content }) => (
  <ClubInfoItemInner>
    <ClubInfoTitle>{title}</ClubInfoTitle>
    <ClubInfoContent>{content}</ClubInfoContent>
  </ClubInfoItemInner>
);

export default ClubInfoItem;
