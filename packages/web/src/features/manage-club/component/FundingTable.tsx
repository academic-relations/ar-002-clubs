import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { ApplyTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type Funding } from "../service/_mock/mockManageClub";

interface FundingTableProps {
  fundingList: Funding[];
}

const FundingTable: React.FC<FundingTableProps> = ({ fundingList }) => {
  const totalRequested = fundingList.reduce(
    (sum, funding) => sum + funding.requestedAmount,
    0,
  );
  const totalApproved = fundingList.reduce(
    (sum, funding) =>
      sum + (funding.approvedAmount === null ? 0 : funding.approvedAmount),
    0,
  );

  return (
    <TableWrapper>
      <TableRow>
        <TableCell type="Header" width="10%" minWidth={116}>
          상태
        </TableCell>
        <TableCell type="Header" width="50%">
          활동명
        </TableCell>
        <TableCell type="Header" width="20%" minWidth={200}>
          항목명
        </TableCell>
        <TableCell type="Header" width="10%" minWidth={120}>
          신청 금액
        </TableCell>
        <TableCell type="Header" width="10%" minWidth={120}>
          승인 금액
        </TableCell>
      </TableRow>
      {fundingList.map((funding, index) => {
        const { color, text } = getTagDetail(funding.status, ApplyTagList);
        return (
          <TableRow key={funding.name + String(index)} isBorder>
            <TableCell type="Tag" width="10%" minWidth={116}>
              <Tag color={color}>{text}</Tag>
            </TableCell>
            <TableCell type="Default" width="50%">
              {funding.name}
            </TableCell>
            <TableCell type="Default" width="20%" minWidth={200}>
              {funding.itemName}
            </TableCell>
            <TableCell type="Default" width="10%" minWidth={120}>
              {funding.requestedAmount.toLocaleString()}원
            </TableCell>
            <TableCell type="Default" width="10%" minWidth={120}>
              {funding.approvedAmount === null
                ? "-"
                : `${funding.approvedAmount.toLocaleString()}원`}
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell type="Default" width="80%">
          {" "}
        </TableCell>
        <TableCell type="Default" width="10%" minWidth={120}>
          {totalRequested.toLocaleString()}원
        </TableCell>
        <TableCell type="Default" width="10%" minWidth={120}>
          {totalApproved === null ? "-" : `${totalApproved.toLocaleString()}원`}
        </TableCell>
      </TableRow>
    </TableWrapper>
  );
};

export default FundingTable;
