import apiReg017 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg017";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg017RequestBody,
  ApiReg017RequestParam,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg017";

export const postClubRegistrationSendBack = async (
  requestParam: ApiReg017RequestParam,
  requestBody: ApiReg017RequestBody,
) => {
  const { data } = await axiosClientWithAuth.post(
    apiReg017.url(requestParam.applyId.toString()),
    requestBody,
  );

  return apiReg017.responseBodyMap[201].parse(data);
};

defineAxiosMock(mock => {
  mock.onPatch(apiReg017.url("1")).reply(() => [201, {}]);
});
