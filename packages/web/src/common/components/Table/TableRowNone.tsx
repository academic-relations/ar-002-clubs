import React from "react";
import TableCell from "./TableCell";

interface TableRowNoneProp {
  text?: string;
}

const TableRowNone: React.FC<TableRowNoneProp> = ({
  text = "지난 3개월 간 이용 기록이 없습니다.",
}) => (
  <TableCell type="None" width="100%">
    {text}
  </TableCell>
);

export default TableRowNone;
