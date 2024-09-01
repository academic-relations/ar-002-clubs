import apiReg016 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg016";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiReg016RequestParam } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg016";

export const patchClubRegistrationExecutive = async (
  requestParam: ApiReg016RequestParam,
) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiReg016.url(requestParam.applyId.toString()),
  );

  switch (status) {
    case 200:
    case 304:
      return apiReg016.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPatch(apiReg016.url("1")).reply(() => [200, {}]);
});
