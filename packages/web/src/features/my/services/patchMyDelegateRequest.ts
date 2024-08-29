import apiClb014 from "@sparcs-clubs/interface/api/club/endpoint/apiClb014";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb014RequestBody,
  ApiClb014RequestParam,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb014";

export const patchMyDelegateRequest = async (
  requestParam: ApiClb014RequestParam,
  requestBody: ApiClb014RequestBody,
) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiClb014.url(requestParam.requestId),
    requestBody,
  );

  switch (status) {
    case 201:
      return apiClb014.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPatch(apiClb014.url(1)).reply(() => [201, {}]);
});
