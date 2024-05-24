import { ApiCms002ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

export const mockUsageOrders: ApiCms002ResponseOK = {
  usageOrders: [
    {
      orderId: 1,
      clubId: 1,
      chargeStudentName: "John Doe",
      startTerm: new Date("2024-05-24T10:00:00Z"),
      endTerm: new Date("2024-05-24T12:00:00Z"),
    },
    {
      orderId: 2,
      clubId: 2,
      chargeStudentName: "Jane Smith",
      startTerm: new Date("2024-05-25T14:00:00Z"),
      endTerm: new Date("2024-05-25T16:00:00Z"),
    },
  ],
};
