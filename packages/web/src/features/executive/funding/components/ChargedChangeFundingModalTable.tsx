import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Typography from "@sparcs-clubs/web/common/components/Typography";

export interface ChargedChangeFundingProps {
  clubId: number;
  clubNameKr: string;
  clubNameEn: string;
  prevExecutiveName: string;
}

interface ChargedChangeFundingModalTableProps {
  selectedClubInfos: ChargedChangeFundingProps[];
}

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
    header: "이전 담당자",
    cell: info =>
      info.getValue() || (
        <Typography color="GRAY.300" fs={16} lh={24}>
          (미정)
        </Typography>
      ),
    size: 200,
  }),
];

const ChargedChangeFundingModalTable = ({
  selectedClubInfos,
}: ChargedChangeFundingModalTableProps) => {
  const table = useReactTable({
    data: selectedClubInfos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default ChargedChangeFundingModalTable;
