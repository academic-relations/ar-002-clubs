import apiAct017 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiAct017RequestBody,
  ApiAct017RequestParam,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

export const patchActivityExecutiveSendBack = async (
  requestParam: ApiAct017RequestParam,
  requestBody: ApiAct017RequestBody,
) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiAct017.url(requestParam.activityId),
    requestBody,
  );

  switch (status) {
    case 200:
      return apiAct017.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPatch(apiAct017.url(1)).reply(() => [200, {}]);
});
