import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Tag, { type TagColor } from "@sparcs-clubs/web/common/components/Tag";
import Table from "@sparcs-clubs/web/common/components/Table";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { type PastActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data: PastActivityReport[];
}

const columnHelper = createColumnHelper<PastActivityReport>();

const getStatusTagColor = (category: string): TagColor => {
  switch (category) {
    case "작성중":
      return "BLUE";
    case "신청 완료":
      return "PURPLE";
    case "신청 반려":
      return "RED";
    case "승인 완료":
      return "GREEN";
    default:
      return "GRAY";
  }
};

const columns = [
  columnHelper.accessor("activity", {
    id: "activity",
    header: () => (
      <TableCell width="35%" type="Header">
        활동명
      </TableCell>
    ),
    cell: info => (
      <TableCell width="35%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("category", {
    id: "category",
    header: () => (
      <TableCell minWidth={248} width="30%" type="Header">
        활동 분류
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={248} width="30%" type="Default">
        <Tag color={getStatusTagColor(info.getValue())}>{info.getValue()}</Tag>
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor(
    row =>
      `${format(row.startDate, "yyyy년 M월 d일 (E)", { locale: ko })} ~ ${format(row.endDate, "yyyy년 M월 d일 (E)", { locale: ko })}`,
    {
      id: "date-range",
      header: () => (
        <TableCell minWidth={304} width="40%" type="Header">
          활동 기간
        </TableCell>
      ),
      cell: info => (
        <TableCell minWidth={304} width="40%" type="Default">
          {info.getValue()}
        </TableCell>
      ),
      enableSorting: false,
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

const PastActivityReportList: React.FC<ActivityReportListProps> = ({
  data,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableOuter>
      <Typography fs={14} fw="REGULAR" lh={20} ff="PRETENDARD">
        총 {data.length}개
      </Typography>
      <Table table={table} />
    </TableOuter>
  );
};

export default PastActivityReportList;
