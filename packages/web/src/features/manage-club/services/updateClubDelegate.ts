import apiClb007 from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb007RequestBody,
  ApiClb007RequestParam,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";

export const updateClubDelegates = async (
  requestParam: ApiClb007RequestParam,
  requestBody: ApiClb007RequestBody,
) => {
  const { data, status } = await axiosClientWithAuth.put(
    apiClb007.url(requestParam.clubId),
    requestBody,
  );
  switch (status) {
    case 200:
    case 201:
      return apiClb007.responseBodyMap[201].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPut(apiClb007.url(1)).reply(201, {
    clubId: 1,
    delegates: [1, 2, 3],
  });
});
