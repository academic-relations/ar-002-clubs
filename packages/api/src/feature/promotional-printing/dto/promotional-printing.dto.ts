import type { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

type GetStudentPromotionalPrintingsOrdersReturn = Array<
  Pick<
    ApiPrt001ResponseOk["items"][number],
    | "id"
    | "studentName"
    | "status"
    | "desiredPickUpDate"
    | "pickUpTime"
    | "createdAt"
  >
>;

type FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn =
  ApiPrt001ResponseOk["items"][number]["orders"];

export type {
  FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn,
  GetStudentPromotionalPrintingsOrdersReturn,
};
