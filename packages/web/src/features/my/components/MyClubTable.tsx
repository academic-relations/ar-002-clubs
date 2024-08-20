import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  RegistrationStatusTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { mockClubRegister } from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";
import { getTagColorFromDivision } from "@sparcs-clubs/web/types/clubdetail.types";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface MyClubTableProps {
  clubRegisterList: typeof mockClubRegister;
}

const columnHelper =
  createColumnHelper<(typeof mockClubRegister)["items"][number]>();

const columns = [
  columnHelper.accessor("registrationStatusEnum", {
    id: "registrationStatusEnum",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        RegistrationStatusTagList,
      );
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("registrationTypeEnum", {
    id: "registrationTypeEnum",
    header: "구분",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        RegistrationTypeTagList,
      );
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("clubDivision", {
    id: "clubDivision",
    header: "분과",
    cell: info => (
      <Tag color={getTagColorFromDivision(info.getValue())}>
        {info.getValue()}
      </Tag>
    ),
    size: 10,
  }),

  columnHelper.accessor("clubNameKr", {
    id: "clubNameKr",
    header: "동아리",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("activityFieldKr", {
    id: "activityFieldKr",
    header: "활동 분야",
    cell: info => info.getValue(),
    size: 255,
  }),
  columnHelper.accessor("professorName", {
    id: "professorName",
    header: "지도교수",
    cell: info => info.getValue(),
    size: 128,
  }),
];

const MyClubTable: React.FC<MyClubTableProps> = ({ clubRegisterList }) => {
  const table = useReactTable({
    columns,
    data: clubRegisterList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} emptyMessage="동아리 등록 내역이 없습니다." />;
};

export default MyClubTable;
