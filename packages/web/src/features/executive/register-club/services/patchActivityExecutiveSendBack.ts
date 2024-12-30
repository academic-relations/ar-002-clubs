import apiAct017 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiAct017RequestBody,
  ApiAct017RequestParam,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

export const patchActivityExecutiveSendBack = async (
  requestParam: ApiAct017RequestParam,
  requestBody: ApiAct017RequestBody,
) => {
  const { data } = await axiosClientWithAuth.patch(
    apiAct017.url(requestParam.activityId),
    requestBody,
  );

  return apiAct017.responseBodyMap[200].parse(data);
};

defineAxiosMock(mock => {
  mock.onPatch(apiAct017.url(1)).reply(() => [200, {}]);
});
