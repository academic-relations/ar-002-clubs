import apiReg013 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg013";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg013RequestParam,
  ApiReg013ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg013";

export const useUnregisterClub = async (
  requestParam: ApiReg013RequestParam,
): Promise<ApiReg013ResponseOk> => {
  const { data, status } = await axiosClientWithAuth.delete(
    apiReg013.url(requestParam.applyId.toString()),
  );

  switch (status) {
    case 200:
      return apiReg013.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onDelete(apiReg013.url("1")).reply(() => [200]);
});
