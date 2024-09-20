"use client";

import React from "react";

// 배포용 not found 페이지 (시작)
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
// import { useRouter } from "next/navigation";

// import Button from "@sparcs-clubs/web/common/components/Button";
// import Card from "@sparcs-clubs/web/common/components/Card";
// import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import ManageCommonSpaceProgress from "@sparcs-clubs/web/features/manage-club/common-space/components/ManageCommonSpaceProgress";
// import ManageCommonSpaceDetailFrame from "@sparcs-clubs/web/features/manage-club/common-space/frames/ManageCommonSpaceDetailFrame";

// const ManageCommonSpaceDetail = () => {
//   const router = useRouter();
//   const onClick = () => {
//     router.push("/manage-club/common-space");
//   };
//   return (
//     <FlexWrapper direction="column" gap={60}>
//       <PageHead
//         items={[
//           { name: "대표 동아리 관리", path: "/manage-club" },
//           {
//             name: "공용공간 비정기사용 내역",
//             path: "/manage-club/common-space",
//           },
//         ]}
//         title="공용공간 비정기사용 내역"
//         enableLast
//       />
//       <Card outline gap={20}>
//         <ManageCommonSpaceProgress
//           status={CommonSpaceUsageOrderStatusEnum.Applied}
//         />
//         <ManageCommonSpaceDetailFrame />
//       </Card>
//       <Button style={{ width: "max-content" }} onClick={onClick}>
//         목록으로 돌아가기
//       </Button>
//     </FlexWrapper>
//   );
// };

// export default ManageCommonSpaceDetail;
