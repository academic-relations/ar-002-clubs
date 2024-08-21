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
  ApiClb005ResponseCreated,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";

export const usePutClubInfo = () =>
  useMutation<
    ApiClb005ResponseCreated,
    Error,
    {
      requestParam: ApiClb005RequestParam;
      body: ApiClb005RequestBody;
    }
  >({
    mutationFn: async ({
      requestParam,
      body,
    }): Promise<ApiClb005ResponseCreated> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiClb005.url(requestParam.clubId),
        body,
      );

      switch (status) {
        case 201:
          return apiClb005.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onPut(apiClb005.url(1)).reply(() => [201, {}]);
});
