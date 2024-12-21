import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  ActTypeTagList,
  ApplyTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type NewActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data?: NewActivityReport[];
}

const columnHelper = createColumnHelper<NewActivityReport>();
// TODO(ym). 지도교수 승인이 활보 정책 문서 보면 필요없을 것 같지만 혹시 몰라 동연측에 문의 중(결과 확인 후 삭제 예정)
// const getProfessorApprovalTagColor = (professorApproval: string): TagColor => {
//   switch (professorApproval) {
//     case "대기":
//       return "GRAY";
//     case "완료":
//       return "GREEN";
//     case "반려":
//       return "RED";
//     default:
//       return "GRAY";
//   }
// };

const columns = [
  columnHelper.accessor("activityStatusEnumId", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 0,
  }),
  // TODO(ym). 지도교수 승인이 활보 정책 문서 보면 필요없을 것 같지만 혹시 몰라 동연측에 문의 중(결과 확인 후 삭제 예정)
  // columnHelper.accessor("professorApproval", {
  //   id: "professorApproval",
  //   header: "지도교수",
  //   cell: info => (
  //     <Tag color={getProfessorApprovalTagColor(info.getValue())}>
  //       {info.getValue()}
  //     </Tag>
  //   ),
  //   size: 0,
  // }),
  columnHelper.accessor("name", {
    id: "activity",
    header: "활동명",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 32,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startTerm)} ~ ${formatDate(row.endTerm)}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 48,
    },
  ),
];

const NewActivityReportList: React.FC<ActivityReportListProps> = ({
  data = [],
}) => {
  const router = useRouter();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  return (
    <Table
      table={table}
      count={data.length}
      onClick={row => router.push(`/manage-club/activity-report/${row.id}`)}
    />
  );
};

export default NewActivityReportList;
