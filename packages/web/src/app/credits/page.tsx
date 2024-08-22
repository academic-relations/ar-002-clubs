"use client";

import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import MemberCardSection from "@sparcs-clubs/web/features/credits/components/MemberCardSection";
import credits from "@sparcs-clubs/web/features/credits/credits";

const CreditCardsFlexWrapper = styled(FlexWrapper)`
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 20px;
  }
`;

const ResponsiveMemberCardSectionWrapper = styled.div`
  margin-left: 24px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    margin-left: 16px;
  }
`;

const Credits: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "만든 사람들", path: "/credits" }]}
      title="만든 사람들"
    />
    {credits.map((credit, index) => (
      <CreditCardsFlexWrapper direction="column" gap={40} key={credit.semester}>
        {index === 0 ? (
          <>
            <SectionTitle size="lg">{credit.semester}</SectionTitle>
            <ResponsiveMemberCardSectionWrapper>
              <MemberCardSection semesterCredit={credit} leftMargin={0} />
            </ResponsiveMemberCardSectionWrapper>
          </>
        ) : (
          <FoldableSectionTitle title={credit.semester}>
            <ResponsiveMemberCardSectionWrapper>
              <MemberCardSection semesterCredit={credit} />
            </ResponsiveMemberCardSectionWrapper>
          </FoldableSectionTitle>
        )}
      </CreditCardsFlexWrapper>
    ))}
  </FlexWrapper>
);
export default Credits;
