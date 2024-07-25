import type {
  ApiReg001RequestBody,
  ApiReg001RequestParam,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
// import type {
//   ApiPrt002RequestBody,
//   ApiPrt002RequestParam,
// } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt002";
// import type { ApiPrt005ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";

export type PostStudentRegistrationReturn = Array<ApiReg001ResponseCreated>;

export type PostStudentRegistrationParam = ApiReg001RequestParam &
  ApiReg001RequestBody;

// export type FindPromotionalPrintingOrderSizeBypromotionalPrintingOrderIdReturn =
// ApiReg001["items"][number]["orders"];

// export type PostStudentPromotionalPrintingsOrderParam = ApiPrt002RequestParam &
//   ApiPrt002RequestBody;

// export type GetStudentPromotionalPrintingsOrdersMyReturn = Array<
//   Pick<
//     ApiPrt005ResponseOk["items"][number],
//     | "id"
//     | "studentName"
//     | "status"
//     | "desiredPickUpDate"
//     | "pickUpTime"
//     | "createdAt"
//   >
// >;
