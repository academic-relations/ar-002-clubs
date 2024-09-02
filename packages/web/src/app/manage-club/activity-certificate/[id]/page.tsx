"use client";

import React from "react";

// 배포용 not found 페이지 (시작)
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
// import { useRouter } from "next/navigation";

// import Button from "@sparcs-clubs/web/common/components/Button";
// import Card from "@sparcs-clubs/web/common/components/Card";
// import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import ManageActivityCertificateProgress from "@sparcs-clubs/web/features/manage-club/activity-certificate/components/ManageActivityCertificate";
// import ManageCertificateDetailFrame from "@sparcs-clubs/web/features/manage-club/activity-certificate/frames/ManageCertificateDetailFrame";

// const ManageAcfDetail = () => {
//   const router = useRouter();
//   const onClick = () => {
//     router.push("/manage-club/activity-certificate");
//   };
//   return (
//     <FlexWrapper direction="column" gap={60}>
//       <PageHead
//         items={[
//           { name: "대표 동아리 관리", path: "/manage-club" },
//           {
//             name: "활동확인서 발급 내역",
//             path: "/manage-club/activity-certificate",
//           },
//         ]}
//         title="활동확인서 발급 내역"
//         enableLast
//       />
//       <Card outline gap={20}>
//         <ManageActivityCertificateProgress
//           status={ActivityCertificateOrderStatusEnum.Rejected}
//         />
//         <ManageCertificateDetailFrame />
//       </Card>
//       <Button style={{ width: "max-content" }} onClick={onClick}>
//         목록으로 돌아가기
//       </Button>
//     </FlexWrapper>
//   );
// };

// export default ManageAcfDetail;
