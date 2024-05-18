import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";

const FundingTable: React.FC = () => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%">
        상태
      </TableCell>
      <TableCell type="Header" width="50%">
        활동명
      </TableCell>
      <TableCell type="Header" width="20%">
        항목명
      </TableCell>
      <TableCell type="Header" width="10%">
        신청 금액
      </TableCell>
      <TableCell type="Header" width="10%">
        승인 금액
      </TableCell>
    </TableRow>
  </TableWrapper>
);

export default FundingTable;
