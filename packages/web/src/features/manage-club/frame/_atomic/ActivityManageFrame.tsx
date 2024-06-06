import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import FundingTable from "@sparcs-clubs/web/features/manage-club/component/FundingTable";
import ActivityReportTable from "@sparcs-clubs/web/features/manage-club/component/ActivityReportTable";
import {
  ManageTablesWrapper,
  ManageWrapper,
  SectionWrapper,
} from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";

import {
  mockupManageFunding,
  mockupManageReport,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";

const ActivityManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="동아리 활동"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <ManageTablesWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="활동 보고서"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/activity-report"
            />
            <ActivityReportTable activityList={mockupManageReport} />
          </SectionWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="지원금"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/funding"
            />
            <FundingTable fundingList={mockupManageFunding} />
          </SectionWrapper>
        </ManageTablesWrapper>
      )}
    </ManageWrapper>
  );
};

export default ActivityManageFrame;
