import React, { ReactNode } from "react";

import TableCell, {
  TableCellType,
} from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";

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
}

const MyServiceTable: React.FC<MyServiceTableProps> = ({
  headers,
  widths,
  minWidths,
  contentsTypes,
  contents,
}) => (
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
    {contents.map((content, rowIndex) => (
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
);

export default MyServiceTable;
