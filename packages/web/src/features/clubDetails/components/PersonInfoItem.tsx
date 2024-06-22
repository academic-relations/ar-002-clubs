"use client";

import React from "react";

import styled from "styled-components";

interface PersonInfoItemProps {
  title: string;
  content: string;
}

const PersonInfoItemInner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  font-size: 16px;
  line-height: 24px;
  justify-content: center;
`;

const PersonInfoTitle = styled(PersonInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  width: 120px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PersonInfoContent = styled(PersonInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  width: 120px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PersonInfoItem: React.FC<PersonInfoItemProps> = ({ title, content }) => (
  <PersonInfoItemInner>
    <PersonInfoTitle>{title}</PersonInfoTitle>
    <PersonInfoContent>{content}</PersonInfoContent>
  </PersonInfoItemInner>
);

export default PersonInfoItem;
