import apiClb005 from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiClb005RequestParam } from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";

type ISuccessResponseType = z.infer<(typeof apiClb005.responseBodyMap)[201]>;

export const usePutClubInfo = () =>
  useMutation<
    ISuccessResponseType,
    Error,
    {
      requestParam: ApiClb005RequestParam;
      body: z.infer<typeof apiClb005.requestBody>;
    }
  >({
    mutationFn: async ({
      requestParam,
      body,
    }): Promise<ISuccessResponseType> => {
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
