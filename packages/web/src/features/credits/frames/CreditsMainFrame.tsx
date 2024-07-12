import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import MemberCard from "../components/MemberCard";
import credits from "../credits";

import type { Member } from "../credits";

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

const CreditsMainFrame: React.FC = () => {
  const compareMembers = (a: Member, b: Member) => {
    if (a.roleType === b.roleType) {
      return a.nickname.localeCompare(b.nickname);
    }
    return a.roleType - b.roleType;
  };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "만든 사람들", path: "/credits" }]}
        title="만든 사람들"
      />
      {credits.map(credit => (
        <FlexWrapper direction="column" gap={40} key={credit.semester}>
          <FoldableSectionTitle title={credit.semester}>
            <MemberCardWrapper>
              {credit.members
                .sort((a, b) => compareMembers(a, b))
                .map(member => (
                  <MemberCard key={member.nickname} member={member} />
                ))}
            </MemberCardWrapper>
          </FoldableSectionTitle>
        </FlexWrapper>
      ))}
    </FlexWrapper>
  );
};

export default CreditsMainFrame;
