import { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";

import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

export const mockMyRegistration: ApiReg012ResponseOk = {
  registrations: [
    {
      id: 1,
      registrationTypeEnumId: RegistrationTypeEnum.NewProvisional,
      registrationStatusEnumId: RegistrationStatusEnum.Pending,
      krName: "술박스",
      enName: "Soolbox",
    },
  ],
};
