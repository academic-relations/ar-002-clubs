import React, { ReactNode, useState } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import TableCell, {
  TableCellType,
} from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface TableHeaderProps {
  type: TableCellType;
  text: string;
}
interface MyServiceTableProps {
  headers: TableHeaderProps[];
  widths: number[];
  minWidths: number[];
  contentsTypes: TableCellType[];
  contents: ReactNode[][];
  pageLimit?: number;
  topComment?: string;
}

const MyServiceTable: React.FC<MyServiceTableProps> = ({
  headers,
  widths,
  minWidths,
  contentsTypes,
  contents,
  pageLimit = 10,
  topComment = "",
}) => {
  const [page, setPage] = useState<number>(1);
  const data = contents.slice((page - 1) * pageLimit, page * pageLimit);

  return (
    <FlexWrapper direction="column" gap={20} style={{ alignItems: "center" }}>
      <FlexWrapper direction="column" gap={8} style={{ width: "100%" }}>
        {topComment && (
          <Typography
            ff="PRETENDARD"
            fw="REGULAR"
            fs={16}
            lh={20}
            color="GRAY.600"
            style={{
              textAlign: "right",
            }}
          >
            {topComment}
          </Typography>
        )}
        <TableWrapper>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={String(index) + header.text}
                type={header.type}
                width={`${widths[index]}%`}
                minWidth={minWidths[index]}
              >
                {header.text}
              </TableCell>
            ))}
          </TableRow>
          {data.map((content, rowIndex) => (
            <TableRow key={String(rowIndex) + content[0]}>
              {content.map((cell, cellIndex) => (
                <TableCell
                  key={String(cellIndex) + cell}
                  type={contentsTypes[cellIndex]}
                  width={`${widths[cellIndex]}%`}
                  minWidth={minWidths[cellIndex]}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableWrapper>
      </FlexWrapper>
      {contents.length > pageLimit && (
        <Pagination
          totalPage={Math.ceil(contents.length / pageLimit)}
          currentPage={page}
          limit={pageLimit}
          setPage={setPage}
        />
      )}
    </FlexWrapper>
  );
};

export default MyServiceTable;
