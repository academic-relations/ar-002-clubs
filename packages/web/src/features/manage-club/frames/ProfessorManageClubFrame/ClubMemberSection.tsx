import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";

import ProfessorClubMemberTable from "@sparcs-clubs/web/features/activity-report/components/tables/ProfessorClubMemberTable";

interface ClubMemberSectionProps {
  clubId: number;
}

const ClubMemberSection: React.FC<ClubMemberSectionProps> = ({ clubId }) => (
  <FoldableSectionTitle title="회원 명단">
    <FlexWrapper direction="column" gap={40}>
      <FlexWrapper direction="column" gap={20}>
        <ProfessorClubMemberTable clubId={clubId} />
      </FlexWrapper>
    </FlexWrapper>
  </FoldableSectionTitle>
);

export default ClubMemberSection;
