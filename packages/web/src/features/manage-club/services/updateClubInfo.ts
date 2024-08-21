import apiClb005 from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb005RequestBody,
  ApiClb005RequestParam,
  ApiClb005ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";

export const usePutClubInfo = () =>
  useMutation<
    ApiClb005ResponseOk,
    Error,
    {
      requestParam: ApiClb005RequestParam;
      body: ApiClb005RequestBody;
    }
  >({
    mutationFn: async ({
      requestParam,
      body,
    }): Promise<ApiClb005ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiClb005.url(requestParam.clubId),
        body,
      );

      switch (status) {
        case 200:
          return apiClb005.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock
    .onPut(apiClb005.url(1), {
      description: "",
      roomPassword: "",
    })
    .reply(() => [201, {}]);
});
