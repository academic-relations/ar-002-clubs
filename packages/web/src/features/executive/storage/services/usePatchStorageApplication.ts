import apiSto007 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto007";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiSto007RequestBody,
  ApiSto007RequestParam,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto007";

export const usePatchStorageApplication = async (
  requestParam: ApiSto007RequestParam,
  requestBody: ApiSto007RequestBody,
) => {
  const { data } = await axiosClientWithAuth.patch(
    apiSto007.url(requestParam.applicationId),
    requestBody,
  );

  return apiSto007.responseBodyMap[200].parse(data);
};

defineAxiosMock(mock => {
  mock.onPatch(apiSto007.url(1)).reply(() => [200, {}]);
});
