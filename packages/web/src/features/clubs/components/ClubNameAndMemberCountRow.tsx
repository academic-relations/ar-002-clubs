"use client";

import React from "react";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

const ClubNameBlock = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
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
      <Icon type="person" size={16} />
      <div>{membersCount}</div>
    </ClubMemberCountBlock>
  </ClubNameAndMemberCountRowInner>
);

export default ClubNameAndMemberCountRow;
