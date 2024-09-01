import apiAct008 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAct008.responseBodyMap)[200]>;

const usePutActivityReportForNewClub = () =>
  useMutation<
    ISuccessResponseType,
    Error,
    {
      params: z.infer<typeof apiAct008.requestParam>;
      body: z.infer<typeof apiAct008.requestBody>;
    }
  >({
    mutationFn: async ({ params, body }): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.put(
        apiAct008.url(params.activityId),
        body,
      );

      switch (status) {
        case 200:
        case 304:
          return apiAct008.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default usePutActivityReportForNewClub;
