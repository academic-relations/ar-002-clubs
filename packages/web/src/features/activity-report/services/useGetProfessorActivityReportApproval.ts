import apiAct023, {
  ApiAct023RequestParam,
  ApiAct023ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct023";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

const useGetProfessorActivityReportApproval = (
  requestParam: ApiAct023RequestParam,
) =>
  useQuery<ApiAct023ResponseOk, Error>({
    queryKey: [apiAct023.url(requestParam.clubId.toString())],
    queryFn: async (): Promise<ApiAct023ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiAct023.url(requestParam.clubId.toString()),
      );

      // return apiAct023.responseBodyMap[200].parse(data);
      return data;
    },
  });

export default useGetProfessorActivityReportApproval;

defineAxiosMock(mock => {
  mock.onGet(apiAct023.url("1")).reply(() => [
    200,
    {
      isApproved: true,
      approvedAt: new Date(),
    },
  ]);
});
