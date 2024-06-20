import React from "react";
import styled from "styled-components";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import credits from "../credits";

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

const CreditsMainFrame: React.FC = () => (
  <CreditsMainFrameInner>
    <PageHead
      items={[{ name: "만든 사람들", path: "/credits" }]}
      title="만든 사람들"
    />
    {credits.map(credit => (
      <CreditsSectionWrapper key={credit.semester}>
        <FoldableSectionTitle title={credit.semester}>
          {credit.members.map(member => (
            <div key={member.nickname}>
              {member.name} ({member.role})
              {member.comment && <span> - {member.comment}</span>}
            </div>
          ))}
        </FoldableSectionTitle>
      </CreditsSectionWrapper>
    ))}
  </CreditsMainFrameInner>
);

export default CreditsMainFrame;
