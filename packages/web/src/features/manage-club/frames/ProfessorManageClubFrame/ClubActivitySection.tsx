import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";

import ProfessorActivityReportTable from "@sparcs-clubs/web/features/activity-report/components/tables/ProfessorActivityReportTable";

interface ClubActivitySectionProps {
  clubId: number;
}

const ClubActivitySection: React.FC<ClubActivitySectionProps> = ({
  clubId,
}) => (
  <FoldableSectionTitle title="동아리 활동">
    <FlexWrapper direction="column" gap={40}>
      <FlexWrapper direction="column" gap={20}>
        <MoreDetailTitle
          title="활동 보고서"
          moreDetail="내역 더보기"
          moreDetailPath="/manage-club/activity-report"
        />
        <ProfessorActivityReportTable clubId={clubId} />

        {/* TODO: 지원금 테이블 추가 */}
      </FlexWrapper>
    </FlexWrapper>
  </FoldableSectionTitle>
);

export default ClubActivitySection;
