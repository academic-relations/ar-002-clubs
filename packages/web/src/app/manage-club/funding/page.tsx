"use client";

import React from "react";

// 배포용 not found 페이지 (시작)
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import {
//   manageClubFundingPageBreadCrumbName,
//   manageClubFundingPageName,
//   manageClubFundingPagePath,
// } from "@sparcs-clubs/web/constants/manageClubFunding";
// import NewFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/components/NewFundingListSection";
// import PastFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/components/PastFundingListSection";

// const Funding: React.FC = () => (
//   <FlexWrapper direction="column" gap={60}>
//     <PageHead
//       items={[
//         { name: "대표 동아리 관리", path: "/manage-club" },
//         {
//           name: manageClubFundingPageBreadCrumbName,
//           path: manageClubFundingPagePath,
//         },
//       ]}
//       title={manageClubFundingPageName}
//     />
//     {/* TODO: API 구현 이후엔 테이블 데이터 전부 프레임에서 주입해줄 것! */}
//     <NewFundingListSection />
//     <PastFundingListSection />
//   </FlexWrapper>
// );

// export default Funding;
