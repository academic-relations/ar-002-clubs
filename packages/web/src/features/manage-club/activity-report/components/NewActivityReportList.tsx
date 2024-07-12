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

import { type NewActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data: NewActivityReport[];
}

const columnHelper = createColumnHelper<NewActivityReport>();

const getStatusTagColor = (status: string): TagColor => {
  switch (status) {
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
  columnHelper.accessor(row => row.status, {
    id: "status",
    header: () => (
      <TableCell minWidth={116} width="15%" type="Header">
        상태
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={116} width="15%" type="Default">
        <Tag color={getStatusTagColor(info.getValue())}>{info.getValue()}</Tag>
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("activity", {
    id: "activity",
    header: () => (
      <TableCell width="30%" type="Header">
        활동명
      </TableCell>
    ),
    cell: info => (
      <TableCell width="30%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("category", {
    id: "category",
    header: () => (
      <TableCell minWidth={248} width="25%" type="Header">
        활동 분류
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={248} width="25%" type="Default">
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
        <TableCell minWidth={304} width="35%" type="Header">
          활동 기간
        </TableCell>
      ),
      cell: info => (
        <TableCell minWidth={304} width="35%" type="Default">
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

const NewActivityReportList: React.FC<ActivityReportListProps> = ({ data }) => {
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

export default NewActivityReportList;
