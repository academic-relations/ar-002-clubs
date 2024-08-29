import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { AcfTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockExecutiveAcf } from "@sparcs-clubs/web/features/executive/_mock/mockExecutiveAcf";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ExecutiveAcfTableProps {
  acfList: typeof mockExecutiveAcf;
}

const columnHelper =
  createColumnHelper<(typeof mockExecutiveAcf)["items"][number]>();

const columns = [
  columnHelper.accessor("statusEnum", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), AcfTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 80,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 220,
  }),
  columnHelper.accessor("clubName", {
    id: "clubName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 90,
  }),
  columnHelper.accessor("studentPhoneNumber", {
    id: "krPhoneNumber",
    header: "연락처",
    cell: info => info.getValue(),
    size: 130,
  }),
  columnHelper.accessor("issuedNumber", {
    id: "issuedNumber",
    header: "뱔급 매수",
    cell: info => info.getValue(),
    size: 220,
  }),
  columnHelper.accessor("note", {
    id: "note",
    header: "비고",
    cell: info => (info.getValue() === "" ? "-" : info.getValue()),
    size: 260,
  }),
];

const ExecutiveAcfTable: React.FC<ExecutiveAcfTableProps> = ({ acfList }) => {
  const table = useReactTable({
    columns,
    data: acfList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={acfList.total} />;
};

export default ExecutiveAcfTable;
