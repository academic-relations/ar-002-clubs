import { RegistrationEventEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

export const mockupEvents: ApiReg004ResponseOK = {
  events: [
    {
      id: 1,
      startTerm: new Date(2024, 7, 15, 10, 30, 0),
      endTerm: new Date(2024, 8, 25, 10, 30, 0),
      registrationEventEnumId:
        RegistrationEventEnum.StudentRegistrationApplication,
    },
    {
      id: 2,
      startTerm: new Date(2024, 8, 25, 10, 30, 0),
      endTerm: new Date(2024, 8, 25, 12, 30, 0),
      registrationEventEnumId: RegistrationEventEnum.Finish,
    },
    {
      id: 3,
      startTerm: new Date(2024, 8, 25, 12, 30, 0),
      endTerm: new Date(2024, 9, 25, 10, 30, 0),
      registrationEventEnumId:
        RegistrationEventEnum.ClubRegistrationApplication,
    },
    {
      id: 4,
      startTerm: new Date(2024, 9, 25, 10, 30, 0),
      endTerm: new Date(2024, 12, 25, 10, 30, 0),
      registrationEventEnumId:
        RegistrationEventEnum.ClubRegistrationModification,
    },
  ],
};
