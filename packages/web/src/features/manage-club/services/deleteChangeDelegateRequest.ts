import apiClb012 from "@sparcs-clubs/interface/api/club/endpoint/apiClb012";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiClb012RequestParam } from "@sparcs-clubs/interface/api/club/endpoint/apiClb012";

export const deleteChangeDelegateRequest = async (
  requestParam: ApiClb012RequestParam,
) => {
  const { data, status } = await axiosClient.delete(
    apiClb012.url(requestParam.clubId),
  );
  switch (status) {
    case 201:
      return apiClb012.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onDelete(apiClb012.url(1)).reply(() => [201, {}]);
});
