import apiClb014 from "@sparcs-clubs/interface/api/club/endpoint/apiClb014";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb014RequestBody,
  ApiClb014RequestParam,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb014";

export const patchMyDelegateRequest = async (
  requestParam: ApiClb014RequestParam,
  requestBody: ApiClb014RequestBody,
) => {
  const { data } = await axiosClientWithAuth.patch(
    apiClb014.url(requestParam.requestId),
    requestBody,
  );

  return apiClb014.responseBodyMap[201].parse(data);
};

defineAxiosMock(mock => {
  mock.onPatch(apiClb014.url(1)).reply(() => [201, {}]);
});
