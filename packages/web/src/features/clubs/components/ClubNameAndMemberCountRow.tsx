"use client";

import React from "react";
import styled from "styled-components";

const ClubNameBlock = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubMemberCountBlock = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  font-size: 14px;
  line-height: 16px;
`;

// temporarily set box instead of icon
const PersonIcon = styled.div`
  width: 16px;
  height: 16px;
  background-color: gray;
`;

const ClubNameAndMemberCountRowInner = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

type ClubNameAndMemberCountRowProps = {
  name: string;
  membersCount: number;
};

const ClubNameAndMemberCountRow: React.FC<ClubNameAndMemberCountRowProps> = ({
  name,
  membersCount,
}) => (
  <ClubNameAndMemberCountRowInner>
    <ClubNameBlock>{name}</ClubNameBlock>
    <ClubMemberCountBlock>
      <PersonIcon />
      <div>{membersCount}</div>
    </ClubMemberCountBlock>
  </ClubNameAndMemberCountRowInner>
);

export default ClubNameAndMemberCountRow;
