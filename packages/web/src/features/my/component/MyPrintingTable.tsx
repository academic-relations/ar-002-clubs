import React from "react";

import { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import type { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface PrintingTableProps {
  printingList: ApiPrt001ResponseOk;
}

const TagList: {
  [key in PromotionalPrintingOrderStatusEnum]: StatusDetail;
} = {
  [PromotionalPrintingOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [PromotionalPrintingOrderStatusEnum.Approved]: {
    text: "승인",
    color: "YELLOW",
  },
  [PromotionalPrintingOrderStatusEnum.Printed]: {
    text: "출력",
    color: "PURPLE",
  },
  [PromotionalPrintingOrderStatusEnum.Received]: {
    text: "수령",
    color: "GREEN",
  },
};

const getPrintSize = (type: number): string => {
  switch (type) {
    case 0:
      return "A4";
    case 1:
      return "A3";
    default:
      return "None";
  }
}; // TODO: enum 1로 시작함. 나중에 interface 수정할 때 같이 고치기

const MyPrintingTable: React.FC<PrintingTableProps> = ({ printingList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={90}>
        상태
      </TableCell>
      <TableCell type="Header" width="24%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="18%" minWidth={120}>
        동아리
      </TableCell>
      <TableCell type="Header" width="24%">
        수령 일시
      </TableCell>
      <TableCell type="Header" width="24%">
        인쇄 매수
      </TableCell>
    </TableRow>
    {printingList.items.map((printing, index) => {
      const { color, text } = getTagDetail(printing.status, TagList);
      return (
        <TableRow isBorder key={printing.studentName + String(index)}>
          <TableCell type="Tag" width="10%" minWidth={90}>
            <Tag color={color}>{text}</Tag>
          </TableCell>
          <TableCell type="Default" width="24%">
            {formatDateTime(printing.createdAt)}
          </TableCell>
          <TableCell type="Default" width="18%" minWidth={120}>
            {printing.studentName}
          </TableCell>
          <TableCell type="Default" width="24%">
            {formatDateTime(printing.desiredPickUpDate)}
          </TableCell>
          <TableCell type="Default" width="24%">
            {printing.orders
              .sort(
                (a, b) =>
                  b.promotionalPrintingSizeEnum - a.promotionalPrintingSizeEnum,
              ) // TODO: 이렇게 하는 대신 그냥 보여주고 싶은 순서랑 enum을 맞추는게 나을 수도 있음
              .map(
                order =>
                  `${getPrintSize(order.promotionalPrintingSizeEnum)} ${order.numberOfPrints}매`,
              )
              .join(", ")}
          </TableCell>
        </TableRow>
      );
    })}
  </TableWrapper>
);

export default MyPrintingTable;
