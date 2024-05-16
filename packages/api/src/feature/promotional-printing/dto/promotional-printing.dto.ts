import type { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

interface GetPrintingOrderPaginationReturn {
  items: Array<
    Pick<
      ApiPrt001ResponseOk["items"][number],
      "id" | "studentName" | "desiredPickUpDate" | "pickUpTime" | "createdAt"
    > & {
      orders: Array<
        Pick<
          ApiPrt001ResponseOk["items"][number]["orders"][number],
          "numberOfPrints"
        > & { promotionalPrintingSizeEnum: number }
      >;
      status: number;
    }
  >;
  offset: ApiPrt001ResponseOk["offset"];
  total: ApiPrt001ResponseOk["total"];
}

export type { GetPrintingOrderPaginationReturn };
