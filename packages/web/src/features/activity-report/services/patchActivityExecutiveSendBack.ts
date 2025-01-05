import apiAct017 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiAct017RequestBody,
  ApiAct017RequestParam,
  ApiAct017ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

const usePatchActivityExecutiveSendBack = (
  requestParam: ApiAct017RequestParam,
) =>
  useMutation<ApiAct017ResponseOk, Error, { body: ApiAct017RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiAct017ResponseOk> => {
      const { data } = await axiosClientWithAuth.patch(
        apiAct017.url(requestParam.activityId),
        body,
      );

      return apiAct017.responseBodyMap[200].parse(data);
    },
  });

export default usePatchActivityExecutiveSendBack;

defineAxiosMock(mock => {
  mock.onPatch(apiAct017.url(1)).reply(() => [200, {}]);
});
