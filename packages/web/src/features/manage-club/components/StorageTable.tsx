import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { StorageTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getEnumStorage } from "@sparcs-clubs/web/types/storage.types";
import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import type { ApiSto002ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";

interface StorageTableProps {
  storageList: ApiSto002ResponseOk;
}

const columnHelper = createColumnHelper<ApiSto002ResponseOk["items"][number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(
        getEnumStorage(info.getValue()),
        StorageTagList,
      );
      return <Tag color={color}>{text}</Tag>;
    },
    size: 5,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 25,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 5,
  }),
  columnHelper.accessor("studentPhoneNumber", {
    id: "studentPhoneNumber",
    header: "연락처",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("desiredStartDate", {
    id: "desiredStartDate",
    header: "보관 시작 일시",
    cell: info => formatDate(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("desiredEndDate", {
    id: "desiredEndDate",
    header: "보관 종료 일시",
    cell: info => formatDate(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("numberOfNonStandardItems", {
    id: "numberOfNonStandardItems",
    header: "규격 외 물품",
    cell: info => `${info.getValue()}개`,
    size: 20,
  }),
];

const StorageTable: React.FC<StorageTableProps> = ({ storageList }) => {
  const table = useReactTable({
    columns,
    data: storageList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default StorageTable;
