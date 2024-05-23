import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";

interface PrintingTableProps {
  printingList: ApiPrt001ResponseOk;
}

interface TagDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): TagDetail => {
  switch (status) {
    case PromotionalPrintingOrderStatusEnum.Applied:
      return { text: "신청", color: "BLUE" };
    case PromotionalPrintingOrderStatusEnum.Approved:
      return { text: "승인", color: "YELLOW" };
    case PromotionalPrintingOrderStatusEnum.Printed:
      return { text: "출력", color: "PURPLE" };
    case PromotionalPrintingOrderStatusEnum.Received:
      return { text: "수령", color: "GREEN" };
    default:
      return { text: "None", color: "GRAY" };
  }
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
};

const PrintingTable: React.FC<PrintingTableProps> = ({ printingList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={120}>
        상태
      </TableCell>
      <TableCell type="Header" width="24%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="18%">
        신청자
      </TableCell>
      <TableCell type="Header" width="24%">
        수령 일시
      </TableCell>
      <TableCell type="Header" width="24%">
        인쇄 매수
      </TableCell>
    </TableRow>
    {printingList.items.map(printing => (
      <TableRow isBorder>
        <TableCell type="Tag" width="10%" minWidth={120}>
          <Tag color={getStatusDetails(printing.status).color}>
            {getStatusDetails(printing.status).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="24%">
          {formatDateTime(printing.createdAt)}
        </TableCell>
        <TableCell type="Default" width="18%">
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
    ))}
  </TableWrapper>
);

export default PrintingTable;
