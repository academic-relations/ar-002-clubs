import apiAct016 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";

import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiAct016RequestBody,
  ApiAct016RequestParam,
  ApiAct016ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";

const usePatchActivityExecutive = (requestParam: ApiAct016RequestParam) =>
  useMutation<ApiAct016ResponseOk, Error, { body: ApiAct016RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiAct016ResponseOk> => {
      const { data } = await axiosClientWithAuth.patch(
        apiAct016.url(requestParam.activityId),
        body,
      );

      return apiAct016.responseBodyMap[200].parse(data);
    },
  });

export default usePatchActivityExecutive;

defineAxiosMock(mock => {
  mock.onPatch(apiAct016.url(1)).reply(() => [200, {}]);
});
