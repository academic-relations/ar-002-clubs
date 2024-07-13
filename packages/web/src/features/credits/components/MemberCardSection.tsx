import React from "react";

import styled from "styled-components";

import { Credits, Member } from "../credits";

import MemberCard from "./MemberCard";

interface MemberCardSectionProps {
  credit: Credits;
}

const MemberCardWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MemberCardSection: React.FC<MemberCardSectionProps> = ({ credit }) => {
  const compareMembers = (a: Member, b: Member) => {
    if (a.roleType === b.roleType) {
      return a.nickname.localeCompare(b.nickname);
    }
    return a.roleType - b.roleType;
  };

  return (
    <MemberCardWrapper>
      {credit.members
        .sort((a, b) => compareMembers(a, b))
        .map(member => (
          <MemberCard key={member.nickname} member={member} />
        ))}
    </MemberCardWrapper>
  );
};

export default MemberCardSection;
