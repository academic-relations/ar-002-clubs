import apiSto006 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto006";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiSto006RequestBody,
  ApiSto006RequestParam,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto006";

export const usePatchStorageApplication = async (
  requestParam: ApiSto006RequestParam,
  requestBody: ApiSto006RequestBody,
) => {
  const { data } = await axiosClientWithAuth.put(
    apiSto006.url(requestParam.applicationId),
    requestBody,
  );

  return apiSto006.responseBodyMap[200].parse(data);
};

defineAxiosMock(mock => {
  mock.onPatch(apiSto006.url(1)).reply(() => [200, {}]);
});
