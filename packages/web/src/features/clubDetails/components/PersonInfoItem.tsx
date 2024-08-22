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
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 20px;
    gap: 12px;
  }
  justify-content: space-between;
  flex-grow: 1;
`;

const PersonInfoTitle = styled(PersonInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  width: 120px;
  @media (max-width: 1200px) {
    width: 100%;
  }
  justify-content: center;
`;

const PersonInfoContent = styled(PersonInfoItemInner)`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  @media (max-width: 1200px) {
    width: 100%;
  }
  width: 120px;
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  flex-grow: 1;
  min-width: 0;
  position: relative;
`;

const PersonInfoItem: React.FC<PersonInfoItemProps> = ({ title, content }) => (
  <PersonInfoItemInner>
    <PersonInfoTitle>{title}</PersonInfoTitle>
    <PersonInfoContent>{content}</PersonInfoContent>
  </PersonInfoItemInner>
);

export default PersonInfoItem;
