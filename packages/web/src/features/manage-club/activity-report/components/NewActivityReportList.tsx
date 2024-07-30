import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
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

const getProfessorApprovalTagColor = (professorApproval: string): TagColor => {
  switch (professorApproval) {
    case "대기":
      return "GRAY";
    case "완료":
      return "GREEN";
    case "반려":
      return "RED";
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
    header: "상태",
    cell: info => (
      <Tag color={getStatusTagColor(info.getValue())}>{info.getValue()}</Tag>
    ),
    size: 8,
  }),
  columnHelper.accessor("professorApproval", {
    id: "professorApproval",
    header: "지도교수",
    cell: info => (
      <Tag color={getProfessorApprovalTagColor(info.getValue())}>
        {info.getValue()}
      </Tag>
    ),
    size: 8,
  }),
  columnHelper.accessor("activity", {
    id: "activity",
    header: "활동명",
    cell: info => info.getValue(),
    size: 30,
  }),
  columnHelper.accessor("category", {
    id: "category",
    header: "활동 분류",
    cell: info => (
      <Tag color={getCategoryTagColor(info.getValue())}>{info.getValue()}</Tag>
    ),
    size: 25,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startDate)} ~ ${formatDate(row.endDate)}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 35,
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
