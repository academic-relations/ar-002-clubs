import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import Tag, { type TagColor } from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formateDate";

import { type PastActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data: PastActivityReport[];
}

const columnHelper = createColumnHelper<PastActivityReport>();

const getCategoryTagColor = (category: string): TagColor => {
  switch (category) {
    case "동아리 성격에 합치하는 내부 활동":
      return "ORANGE";
    case "동아리 성격에 합치하는 외부 활동":
      return "BLUE";
    case "동아리 성격에 합치하지 않는 활동":
      return "PURPLE";
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
        <Tag color={getCategoryTagColor(info.getValue())}>
          {info.getValue()}
        </Tag>
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startDate)} ~ ${formatDate(row.endDate)}`,
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
      <Typography fs={14} fw="REGULAR" lh={20} ff="PRETENDARD" color="GRAY.600">
        총 {data.length}개
      </Typography>
      <Table table={table} />
    </TableOuter>
  );
};

export default PastActivityReportList;
