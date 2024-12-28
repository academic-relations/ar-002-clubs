import apiAct004, {
  ApiAct004RequestParam,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct004";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAct004.responseBodyMap)[200]>;

export const useDeleteActivityReport = () =>
  useMutation<
    ISuccessResponseType,
    Error,
    { requestParam: ApiAct004RequestParam }
  >({
    mutationFn: async ({ requestParam }): Promise<ISuccessResponseType> => {
      const { data } = await axiosClientWithAuth.delete(
        apiAct004.url(requestParam.activityId),
        {},
      );

      return apiAct004.responseBodyMap[200].parse(data);
    },
  });