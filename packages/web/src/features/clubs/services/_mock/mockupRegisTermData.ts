import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

const mockupData: ApiReg004ResponseOK = {
  events: [
    {
      id: 1,
      registrationEventEnumId:
        RegistrationDeadlineEnum.ClubRegistrationApplication,
      startTerm: new Date(`2024-08-02T09:00:00Z`),
      endTerm: new Date(`2024-08-31T09:00:00Z`),
    },
    {
      id: 2,
      registrationEventEnumId: RegistrationDeadlineEnum.Finish,
      startTerm: new Date(`2024-09-02T09:00:00Z`),
      endTerm: new Date(`2024-09-14T09:00:00Z`),
    },
    {
      id: 3,
      registrationEventEnumId:
        RegistrationDeadlineEnum.StudentRegistrationApplication,
      startTerm: new Date(),
      endTerm: new Date(),
    },
    {
      id: 4,
      registrationEventEnumId:
        RegistrationDeadlineEnum.StudentRegistrationApplication,
      startTerm: new Date(`2024-09-16T09:00:00Z`),
      endTerm: new Date(`2024-09-27T09:00:00Z`),
    },
  ],
};

export default mockupData;
