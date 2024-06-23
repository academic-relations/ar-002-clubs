"use client";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import {
  manageClubFundingPageBreadCrumbName,
  manageClubFundingPageName,
  manageClubFundingPagePath,
} from "@sparcs-clubs/web/constants/manageClubFunding";
import ManageClubFundingMainFrame from "@sparcs-clubs/web/features/manage-club/funding/frame/ManageClubFundingMainFrame";

const Funding = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        {
          name: manageClubFundingPageBreadCrumbName,
          path: manageClubFundingPagePath,
        },
      ]}
      title={manageClubFundingPageName}
    />
    <ManageClubFundingMainFrame />
  </>
);

export default Funding;
