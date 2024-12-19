import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
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

const TableOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const NewActivityReportList: React.FC<ActivityReportListProps> = ({
  data = [],
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  return (
    <TableOuter>
      <Typography fs={14} fw="REGULAR" lh={20} ff="PRETENDARD" color="GRAY.600">
        총 {data.length}개
      </Typography>
      <Table table={table} />
    </TableOuter>
  );
};

export default NewActivityReportList;
