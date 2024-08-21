import apiAct003 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAct003.responseBodyMap)[200]>;

export const usePutActivityReport = () =>
  useMutation<
    ISuccessResponseType,
    Error,
    { activityId: number; body: z.infer<typeof apiAct003.requestBody> }
  >({
    mutationFn: async ({ activityId, body }): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiAct003.url(activityId),
        body,
      );

      switch (status) {
        case 200:
          return apiAct003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
