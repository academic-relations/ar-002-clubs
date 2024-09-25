import apiReg007 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg007";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiReg007RequestBody,
  ApiReg007RequestParam,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg007";

export const patchClubMemberRegistration = async (
  requestParam: ApiReg007RequestParam,
  requestBody: ApiReg007RequestBody,
) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiReg007.url(requestParam.applyId.toString()),
    requestBody,
  );

  switch (status) {
    case 204: {
      return data;
      // return apiReg007.responseBodyMap[204].parse(data);
    }
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock
    .onPatch(apiReg007.url("1"), { clubId: 1, applyStatusEnumId: 3 })
    .reply(() => [204, {}]);
});
