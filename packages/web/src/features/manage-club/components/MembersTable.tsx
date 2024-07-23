import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import TableButton from "@sparcs-clubs/web/common/components/Table/TableButton";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { MemTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import {
  type Members,
  MemberStatusEnum,
} from "../service/_mock/mockManageClub";

interface MembersTableProps {
  memberList: Members[];
}

const columnHelper = createColumnHelper<Members>();

const columns = [
  columnHelper.accessor("status", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), MemTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("applicationDate", {
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("studentId", {
    header: "학번",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("applicantName", {
    header: "신청자",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("phoneNumber", {
    header: "전화번호",
    cell: info => info.getValue(),
    size: 15,
  }),
  columnHelper.accessor("email", {
    header: "이메일",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.display({
    id: "remarks",
    header: "비고",
    cell: info => {
      const member = info.row.original;
      return member.status === MemberStatusEnum.Applied ? (
        <TableButton
          text={["승인", "반려"]}
          onClick={[() => {}, () => {}]}
          // TODO: 승인 반려 기능 넣기
        />
      ) : (
        " "
      );
    },
    size: 15,
  }),
];

const MembersTable: React.FC<MembersTableProps> = ({ memberList }) => {
  const table = useReactTable({
    columns,
    data: memberList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default MembersTable;
