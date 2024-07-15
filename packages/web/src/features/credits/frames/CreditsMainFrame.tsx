import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import MemberCardSection from "../components/MemberCardSection";
import credits from "../credits";

const CreditsMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "만든 사람들", path: "/credits" }]}
      title="만든 사람들"
    />
    {credits.map((credit, index) => (
      <FlexWrapper direction="column" gap={40} key={credit.semester}>
        {index === 0 ? (
          <>
            <SectionTitle size="lg">{credit.semester}</SectionTitle>
            <MemberCardSection credit={credit} leftMargin={24} />
          </>
        ) : (
          <FoldableSectionTitle title={credit.semester}>
            <MemberCardSection credit={credit} />
          </FoldableSectionTitle>
        )}
      </FlexWrapper>
    ))}
  </FlexWrapper>
);

export default CreditsMainFrame;
