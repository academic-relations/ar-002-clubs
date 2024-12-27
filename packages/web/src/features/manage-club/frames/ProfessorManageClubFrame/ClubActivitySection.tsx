import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";

interface ClubActivitySectionProps {
  clubId: number;
}

const ClubActivitySection: React.FC<ClubActivitySectionProps> = ({
  clubId,
}) => {
  console.log(clubId);

  return (
    <FoldableSectionTitle title="동아리 활동">
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={20}>
          TBD
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default ClubActivitySection;
