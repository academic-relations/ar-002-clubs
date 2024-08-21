import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  DivisionTypeTagList,
  RegistrationStatusTagList,
  RegistrationTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { RegisterClubList } from "@sparcs-clubs/web/features/register-club/service/_mock/mockRegisterClub";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ExecutiveRegistrationTableProps {
  registerList: RegisterClubList;
}

const columnHelper = createColumnHelper<RegisterClubList["items"][number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        RegistrationStatusTagList,
      );
      return (
        <Tag color={color} width="50px">
          {text}
        </Tag>
      );
    },
    size: 90,
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: "구분",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        RegistrationTypeTagList,
      );
      return (
        <Tag color={color} width="80px">
          {text}
        </Tag>
      );
    },
    size: 120,
  }),
  columnHelper.accessor("division", {
    id: "division",
    header: "분과",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        DivisionTypeTagList,
      );
      return (
        <Tag color={color} width="80px">
          {text}
        </Tag>
      );
    },
    size: 120,
  }),
  columnHelper.accessor("clubName", {
    id: "clubName",
    header: "동아리",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("president", {
    id: "president",
    header: "대표자",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("activityField", {
    id: "activityField",
    header: "활동 분야",
    cell: info => info.getValue(),
    size: 240,
  }),
  columnHelper.accessor("advisorProfessor", {
    id: "advisorProfessor",
    header: "지도교수",
    cell: info => info.getValue(),
  }),
];

const ExecutiveRegistrationTable: React.FC<ExecutiveRegistrationTableProps> = ({
  registerList,
}) => {
  const table = useReactTable({
    columns,
    data: registerList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={registerList.total} />;
};

export default ExecutiveRegistrationTable;