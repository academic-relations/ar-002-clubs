import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import getChargedExecutiveContent from "@sparcs-clubs/web/utils/getChargedExecutiveContent";

export interface ChargedChangeFundingProps {
  clubId: number;
  clubNameKr: string;
  clubNameEn: string;
  prevExecutiveName: string;
}

interface ChargedChangeFundingModalTableProps {
  selectedClubInfos: ChargedChangeFundingProps[];
  newExecutiveName: string;
}

const ChargedChangeFundingModalTable = ({
  selectedClubInfos,
  newExecutiveName,
}: ChargedChangeFundingModalTableProps) => {
  const columnHelper = createColumnHelper<ChargedChangeFundingProps>();
  const columns = [
    columnHelper.accessor("clubNameKr", {
      header: "동아리명 (한글)",
      cell: info => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor("clubNameEn", {
      header: "동아리명 (영문)",
      cell: info => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor("prevExecutiveName", {
      header: "담당자",
      cell: info =>
        getChargedExecutiveContent(info.getValue(), newExecutiveName),
      size: 200,
    }),
  ];

  const table = useReactTable({
    data: selectedClubInfos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} minWidth={200} />;
};

export default ChargedChangeFundingModalTable;
