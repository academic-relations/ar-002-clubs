import apiReg017 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg017";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg017RequestBody,
  ApiReg017RequestParam,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg017";

export const postClubRegistrationSendBack = async (
  requestParam: ApiReg017RequestParam,
  requestBody: ApiReg017RequestBody,
) => {
  const { data, status } = await axiosClientWithAuth.post(
    apiReg017.url(requestParam.applyId.toString()),
    requestBody,
  );

  switch (status) {
    case 201:
      return apiReg017.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPatch(apiReg017.url("1")).reply(() => [201, {}]);
});
