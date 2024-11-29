import React from "react";

import { ApiSto012ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { StorageTagList } from "@sparcs-clubs/web/constants/tableTagList";
import mockupStorage from "@sparcs-clubs/web/features/executive/storage/_mock/mockStorage";
import { getEnumStorage } from "@sparcs-clubs/web/types/storage.types";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface StorageTableProps {
  storageList: ApiSto012ResponseOk;
}

const columnHelper =
  createColumnHelper<(typeof mockupStorage)["items"][number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color: tagColor } = getTagDetail(
        getEnumStorage(info.getValue()),
        StorageTagList,
      );
      return <Tag color={tagColor}>{info.getValue()}</Tag>;
    },
    size: 120,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => info.getValue(),
    size: 291.67,
  }),
  columnHelper.accessor("clubNameKr", {
    id: "clubNameKr",
    header: "동아리",
    cell: info => info.getValue(),
    size: 291.67,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 291.67,
  }),
  columnHelper.accessor("studentPhoneNumber", {
    id: "studentPhoneNumber",
    header: "연락처",
    cell: info => info.getValue(),
    size: 291.67,
  }),
  columnHelper.accessor("desiredStartDate", {
    id: "desiredStartDate",
    header: "보관 시작 일시",
    cell: info => formatDate(info.getValue()),
    size: 291.67,
  }),
  columnHelper.accessor("desiredEndDate", {
    id: "desiredEndDate",
    header: "보관 종료 일시",
    cell: info => formatDate(info.getValue()),
    size: 291.67,
  }),
  columnHelper.accessor("numberOfNonStandardItems", {
    id: "numberOfNonStandardItems",
    header: "보관 종료 일시",
    cell: info => `${info.getValue()}개`,
    size: 291.67,
  }),
];

const StorageTable: React.FC<StorageTableProps> = ({ storageList }) => {
  const table = useReactTable({
    columns,
    data: storageList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table
      table={table}
      count={storageList.total}
      rowLink={row => `/executive/storage/${row.applicationId}`}
    />
  );
};

export default StorageTable;
