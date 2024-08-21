import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import type { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

/* API 문서에는 AppliedStatusEum으로 명명되어 있는데 관련 enum이 없어서 RegistraionStatusEum으로 구현함 */

const mockupRegistraion: ApiReg006ResponseOk = {
  applies: [
    {
      id: 1,
      clubId: 1,
      applyStatusEnumId: RegistrationApplicationStudentStatusEnum.Pending,
    },

    {
      id: 2,
      clubId: 2,
      applyStatusEnumId: RegistrationApplicationStudentStatusEnum.Approved,
    },
    {
      id: 3,
      clubId: 3,
      applyStatusEnumId: RegistrationApplicationStudentStatusEnum.Approved,
    },
  ],
};

export default mockupRegistraion;
