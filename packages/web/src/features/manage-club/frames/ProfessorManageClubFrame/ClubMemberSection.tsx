import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";

interface ClubMemberSectionProps {
  clubId: number;
}

const ClubMemberSection: React.FC<ClubMemberSectionProps> = ({ clubId }) => {
  console.log(clubId);

  return (
    <FoldableSectionTitle title="회원 명단">
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={20}>
          TBD
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default ClubMemberSection;
