import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

const mockupData: ApiReg004ResponseOK = {
  events: [
    {
      id: 1,
      registrationEventEnumId: 1,
      startTerm: new Date(`2024-09-02T09:00:00Z`),
      endTerm: new Date(`2024-09-14T09:00:00Z`),
    },
    {
      id: 2,
      registrationEventEnumId: 2,
      startTerm: new Date(`2024-09-02T09:00:00Z`),
      endTerm: new Date(`2024-09-14T09:00:00Z`),
    },
    {
      id: 3,
      registrationEventEnumId: 3,
      startTerm: new Date(),
      endTerm: new Date(),
    },
    {
      id: 4,
      registrationEventEnumId: 4,
      startTerm: new Date(`2024-09-16T09:00:00Z`),
      endTerm: new Date(`2024-09-27T09:00:00Z`),
    },
  ],
};

export default mockupData;
