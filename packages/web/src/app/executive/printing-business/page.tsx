"use client";

// 배포용 not found 페이지 (시작)
import NotFound from "@sparcs-clubs/web/app/not-found";

const TemporaryNotFound = () => <NotFound />;

export default TemporaryNotFound;
// 배포용 not found 페이지 (끝)

// import React, { useState } from "react";

// import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
// import ExecutivePrintingTable from "@sparcs-clubs/web/common/components/ExecutivePrintingTable";
// import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
// import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import Pagination from "@sparcs-clubs/web/common/components/Pagination";
// import mockupPrint from "@sparcs-clubs/web/features/printing-business/service/_mock/mockPrinting";

// const PrintingBusiness = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 10;

//   /* TODO : API로 데이터 받아오기 */
//   const paginatedData = {
//     total: mockupPrint.total,
//     items: mockupPrint.items.slice(
//       (currentPage - 1) * limit,
//       currentPage * limit,
//     ),
//     offset: (currentPage - 1) * limit,
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <FlexWrapper direction="column" gap={20}>
//       <PageHead
//         items={[
//           { name: "집행부원 대시보드", path: "/executive" },
//           { name: "홍보물 인쇄 내역", path: `/executive/printing-business` },
//         ]}
//         title="홍보물 인쇄 내역"
//       />
//       <AsyncBoundary isLoading={false} isError={false}>
//         <ExecutivePrintingTable printingList={paginatedData} />
//         <FlexWrapper direction="row" gap={16} justify="center">
//           <Pagination
//             totalPage={Math.ceil(mockupPrint.total / limit)}
//             currentPage={currentPage}
//             limit={limit}
//             setPage={handlePageChange}
//           />
//         </FlexWrapper>
//       </AsyncBoundary>
//     </FlexWrapper>
//   );
// };

// export default PrintingBusiness;
