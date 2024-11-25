import React from "react";

import { ApiAct011ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import { ActStatusTagList } from "@sparcs-clubs/web/constants/tableTagList";
import PastActivityReportModal from "@sparcs-clubs/web/features/register-club/components/_atomic/PastActivityReportModal";

import {
  getActivityTypeTagColor,
  getActivityTypeTagLabel,
} from "@sparcs-clubs/web/features/register-club/utils/activityType";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { ActivityReport } from "../types/registerClub";

interface ActivityReportListProps {
  data: ActivityReport[];
  profile: string;
  refetch?: () => void;
}

const columnHelper =
  createColumnHelper<ApiAct011ResponseOk["activities"][number]>();

const columns = [
  columnHelper.accessor("activityStatusEnumId", {
    id: "activityStatusEnumId",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActStatusTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 64,
  }),
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => (
      <Tag color={getActivityTypeTagColor(info.getValue())}>
        {getActivityTypeTagLabel(info.getValue())}
      </Tag>
    ),
    size: 128,
  }),
  columnHelper.accessor(
    row =>
      `${formatDate(row.durations[0].startTerm)} ~ ${formatDate(row.durations[0].endTerm)}${row.durations.length > 1 ? ` 외 ${row.durations.length - 1}개` : ""}`,
    {
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 255,
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

const ActivityReportList: React.FC<ActivityReportListProps> = ({
  data,
  profile,
  refetch = () => {},
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
        profile={profile}
        activityId={activityId}
        isOpen={isOpen}
        close={() => {
          close();
          refetch();
        }}
      />
    ));
  };

  return (
    <TableOuter>
      <Table
        table={table}
        count={data.length}
        onClick={row => openPastActivityReportModal(row.id)}
      />
    </TableOuter>
  );
};

export default ActivityReportList;