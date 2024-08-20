import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { ActTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { ActivityTypeEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { mockMyClubRegisterAcf } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClubRegisterDetail";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface MyRegisterClubAcfTableProps {
  clubRegisterAcfList: {
    items: [
      {
        activityName: string;
        activityType: ActivityTypeEnum;
        activityPeriod: string;
      },
    ];
  };
}

const columnHelper =
  createColumnHelper<(typeof mockMyClubRegisterAcf)["items"][number]>();

const columns = [
  columnHelper.accessor("activityName", {
    id: "activityName",
    header: "활동명",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("activityType", {
    id: "activityType",
    header: "분과",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 128,
  }),

  columnHelper.accessor("activityPeriod", {
    id: "activityPeriod",
    header: "활동 기간",
    cell: info => {
      const { activityStart, activityEnd } = info.row.original;
      return `${formatDate(activityStart)} ~ ${formatDate(activityEnd)}`;
    },
    size: 255,
  }),
];

const MyRegisterClubAcfTable: React.FC<MyRegisterClubAcfTableProps> = ({
  clubRegisterAcfList,
}) => {
  const table = useReactTable({
    columns,
    data: clubRegisterAcfList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default MyRegisterClubAcfTable;
