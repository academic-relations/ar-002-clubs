import apiReg013 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg013";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg013RequestParam,
  ApiReg013ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg013";

export const useUnregisterClub = async (
  requestParam: ApiReg013RequestParam,
): Promise<ApiReg013ResponseOk> => {
  const { data } = await axiosClientWithAuth.delete(
    apiReg013.url(requestParam.applyId.toString()),
  );

  return apiReg013.responseBodyMap[200].parse(data);
};

defineAxiosMock(mock => {
  mock.onDelete(apiReg013.url("1")).reply(() => [200]);
});
