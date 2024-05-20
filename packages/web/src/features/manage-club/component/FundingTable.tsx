import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";

import type { Funding } from "../service/_mock/mockManageClub";

interface FundingTableProps {
  fundingList: Funding[];
}

const FundingTable: React.FC<FundingTableProps> = ({ fundingList }) => (
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
    {fundingList.map(funding => (
      <TableRow>
        <TableCell type="Tag" width="10%">
          상태
        </TableCell>
        <TableCell type="Default" width="50%">
          {funding.name}
        </TableCell>
        <TableCell type="Tag" width="20%">
          항목명
        </TableCell>
        <TableCell type="Default" width="10%">
          {funding.requestedAmount.toLocaleString()}원
        </TableCell>
        <TableCell type="Default" width="10%">
          {funding.approvedAmount === null
            ? "-"
            : `${funding.approvedAmount.toLocaleString()}원`}
        </TableCell>
      </TableRow>
    ))}
    <TableRow>
      <TableCell type="Default" width="80%">
        {" "}
      </TableCell>
      <TableCell type="Default" width="10%">
        신청 금액
      </TableCell>
      <TableCell type="Default" width="10%">
        승인 금액
      </TableCell>
    </TableRow>
  </TableWrapper>
);

export default FundingTable;
