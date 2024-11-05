import apiReg010 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiReg010RequestParam } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg010";

export const deleteMyClubRegistration = async (
  requestParam: ApiReg010RequestParam,
) => {
  const { data } = await axiosClientWithAuth.delete(
    apiReg010.url(requestParam.applyId),
  );

  return apiReg010.responseBodyMap[200].parse(data);
};

defineAxiosMock(mock => {
  mock.onDelete(apiReg010.url(1)).reply(() => [200, {}]);
});
