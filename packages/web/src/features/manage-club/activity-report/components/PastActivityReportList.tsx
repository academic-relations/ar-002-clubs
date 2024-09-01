import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import PastActivityReportModal from "@sparcs-clubs/web/features/register-club/components/_atomic/PastActivityReportModal";

import {
  getActivityTypeTagColor,
  getActivityTypeTagLabel,
} from "@sparcs-clubs/web/features/register-club/utils/activityType";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { PastActivityReport } from "../_mock/mock";

interface ActivityReportListProps {
  data: PastActivityReport[];
  showItemCount?: boolean;
}

const columnHelper = createColumnHelper<PastActivityReport>();

const columns = [
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 35,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => (
      <Tag color={getActivityTypeTagColor(info.getValue())}>
        {getActivityTypeTagLabel(info.getValue())}
      </Tag>
    ),
    size: 30,
  }),
  columnHelper.accessor(
    row =>
      `${formatDate(row.durations[0].startTerm)} ~ ${formatDate(row.durations[0].endTerm)}${row.durations.length > 1 ? ` 외 ${row.durations.length - 1}개` : ""}`,
    {
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 40,
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
  showItemCount = true,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  const openPastActivityReportModal = (activityId: number) => {
    overlay.open(({ isOpen, close }) => (
      <PastActivityReportModal
        activityId={activityId}
        isOpen={isOpen}
        close={close}
      />
    ));
  };

  return (
    <TableOuter>
      {showItemCount && (
        <Typography
          fs={14}
          fw="REGULAR"
          lh={20}
          ff="PRETENDARD"
          color="GRAY.600"
        >
          총 {data.length}개
        </Typography>
      )}
      <Table
        table={table}
        onClick={row => openPastActivityReportModal(row.id)}
      />
    </TableOuter>
  );
};

export default PastActivityReportList;
