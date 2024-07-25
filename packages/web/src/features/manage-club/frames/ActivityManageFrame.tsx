import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import ActivityReportTable from "@sparcs-clubs/web/features/manage-club/components/ActivityReportTable";
import FundingTable from "@sparcs-clubs/web/features/manage-club/components/FundingTable";
import {
  mockupManageFunding,
  mockupManageReport,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

const ActivityManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <FoldableSectionTitle
      title="동아리 활동"
      toggle={toggle}
      toggleHandler={() => setToggle(!toggle)}
    >
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title="활동 보고서"
            moreDetail="내역 더보기"
            moreDetailPath="/manage-club/activity-report"
          />
          <ActivityReportTable activityList={mockupManageReport} />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title="지원금"
            moreDetail="내역 더보기"
            moreDetailPath="/manage-club/funding"
          />
          <FundingTable fundingList={mockupManageFunding} />
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default ActivityManageFrame;
