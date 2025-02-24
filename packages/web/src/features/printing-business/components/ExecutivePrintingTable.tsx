import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { PrtTagList } from "@sparcs-clubs/web/constants/tableTagList";
import mockupPrint from "@sparcs-clubs/web/features/printing-business/services/_mock/mockPrinting";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import getPrintSize from "@sparcs-clubs/web/utils/getPrintSize";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ExecutivePrintingTableProps {
  printingList: typeof mockupPrint;
}

const columnHelper =
  createColumnHelper<(typeof mockupPrint)["items"][number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), PrtTagList);
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
  columnHelper.accessor("krPhoneNumber", {
    id: "krPhoneNumber",
    header: "연락처",
    cell: info => info.getValue(),
    size: 130,
  }),
  columnHelper.accessor("desiredPickUpDate", {
    id: "desiredPickUpDate",
    header: "수령 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 220,
  }),
  columnHelper.accessor("orders", {
    id: "orders",
    header: "인쇄 매수",
    cell: info =>
      info
        .getValue()
        .sort(
          (a, b) =>
            b.promotionalPrintingSizeEnum - a.promotionalPrintingSizeEnum,
        )
        .map(
          order =>
            `${getPrintSize(order.promotionalPrintingSizeEnum)} ${
              order.numberOfPrints
            }매`,
        )
        .join(", "),
    size: 260,
  }),
];

const ExecutivePrintingTable: React.FC<ExecutivePrintingTableProps> = ({
  printingList,
}) => {
  const table = useReactTable({
    columns,
    data: printingList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={printingList.total} />;
};

export default ExecutivePrintingTable;
