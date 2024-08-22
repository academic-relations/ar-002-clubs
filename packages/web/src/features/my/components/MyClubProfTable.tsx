import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { RegistrationStatusTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockProfClubRegister } from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";
import { getTagColorFromDivision } from "@sparcs-clubs/web/types/clubdetail.types";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface MyClubTableProps {
  clubProfRegisterList: typeof mockProfClubRegister;
}
const columnHelper =
  createColumnHelper<(typeof mockProfClubRegister)["items"][number]>();
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
  columnHelper.accessor("studentNumber", {
    id: "studentNumber",
    header: "학번",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "대표자",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "전화번호",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("studentEmail", {
    id: "studentEmail",
    header: "이메일",
    cell: info => info.getValue(),
    size: 128,
  }),
];
const MyClubTable: React.FC<MyClubTableProps> = ({ clubProfRegisterList }) => {
  const table = useReactTable({
    columns,
    data: clubProfRegisterList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  const getRowLink = (row: (typeof mockProfClubRegister)["items"][number]) => ({
    pathname: `/my/register-club/${row.clubId.toString()}`,
  });
  return (
    <Table
      table={table}
      rowLink={getRowLink}
      emptyMessage="동아리 등록 내역이 없습니다."
    />
  );
};
export default MyClubTable;
