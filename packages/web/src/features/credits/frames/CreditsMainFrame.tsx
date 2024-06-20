import React from "react";
import styled from "styled-components";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import credits from "../credits";
import MemberCard from "../components/MemberCard";

const CreditsMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const CreditsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MemberCardWrapper = styled.div`
  display: grid;
  grid-gap: 20px;

  @media (min-width: 1441px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1201px) and (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 961px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 721px) and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const CreditsMainFrame: React.FC = () => (
  <CreditsMainFrameInner>
    <PageHead
      items={[{ name: "만든 사람들", path: "/credits" }]}
      title="만든 사람들"
    />
    {credits.map(credit => (
      <CreditsSectionWrapper key={credit.semester}>
        <FoldableSectionTitle title={credit.semester}>
          <MemberCardWrapper>
            {credit.members.map(member => (
              <MemberCard key={member.nickname} member={member} />
            ))}
          </MemberCardWrapper>
        </FoldableSectionTitle>
      </CreditsSectionWrapper>
    ))}
  </CreditsMainFrameInner>
);

export default CreditsMainFrame;
