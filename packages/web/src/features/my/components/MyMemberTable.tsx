import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { RegistrationStatusTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockMemberRegister } from "@sparcs-clubs/web/features/my/services/_mock/mockMyRegister";
import {
  getTagColorFromClubType,
  getTagColorFromDivision,
  getTagContentFromClubType,
} from "@sparcs-clubs/web/types/clubdetail.types";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface MyMemberTableProps {
  memberRegisterList: typeof mockMemberRegister;
}

const columnHelper =
  createColumnHelper<(typeof mockMemberRegister)["applies"][number]>();

const columns = [
  columnHelper.accessor("applyStatusEnum", {
    id: "applyStatusEnum",
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
  columnHelper.accessor("clubType", {
    id: "clubType",
    header: "구분",
    cell: info => (
      <Tag
        color={getTagColorFromClubType(
          info.getValue().type,
          info.getValue().isPermanent,
        )}
      >
        {getTagContentFromClubType(
          info.getValue().type,
          info.getValue().isPermanent,
        )}
      </Tag>
    ),
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
];

const MyMemberTable: React.FC<MyMemberTableProps> = ({
  memberRegisterList,
}) => {
  const table = useReactTable({
    columns,
    data: memberRegisterList.applies,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  const getRowLink = (row: (typeof mockMemberRegister)["applies"][number]) => ({
    pathname: `/clubs/${row.clubId.toString()}`,
  });
  return (
    <Table
      table={table}
      rowLink={getRowLink}
      emptyMessage="회원 등록 내역이 없습니다."
    />
  );
};

export default MyMemberTable;
