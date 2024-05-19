import type { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import type {
  ApiPrt002RequestParam,
  ApiPrt002RequestBody,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";

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

type PostStudentPromotionalPrintingsOrderParam = ApiPrt002RequestParam &
  ApiPrt002RequestBody;

export type {
  FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn,
  GetStudentPromotionalPrintingsOrdersReturn,
  PostStudentPromotionalPrintingsOrderParam,
};
