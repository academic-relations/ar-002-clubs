import apiAct016 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiAct016RequestParam } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";

export const patchActivityExecutive = async (
  requestParam: ApiAct016RequestParam,
) => {
  const { data, status } = await axiosClientWithAuth.patch(
    apiAct016.url(requestParam.activityId),
  );

  switch (status) {
    case 200:
      return apiAct016.responseBodyMap[200].parse(data);
    default:
      throw new UnexpectedAPIResponseError();
  }
};

defineAxiosMock(mock => {
  mock.onPatch(apiAct016.url(1)).reply(() => [200, {}]);
});
