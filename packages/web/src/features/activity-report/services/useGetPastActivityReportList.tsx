import apiAct006, {
  ApiAct006RequestQuery,
  ApiAct006ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

const useGetPastActivityReportList = (
  activityTermId: number,
  query: ApiAct006RequestQuery,
) =>
  useQuery<ApiAct006ResponseOk, Error>({
    queryKey: [apiAct006.url(activityTermId), query.clubId],
    queryFn: async (): Promise<ApiAct006ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiAct006.url(activityTermId),
        {
          params: query,
        },
      );

      return apiAct006.responseBodyMap[200].parse(data);
    },
  });

export default useGetPastActivityReportList;

const baseUrl = "/student/activities/activity-terms/activity-term/";

defineAxiosMock(mock => {
  mock.onGet(new RegExp(`^${baseUrl}\\d+$`)).reply(() => [
    200,
    {
      activities: [
        {
          id: 111,
          name: "개발개발한 어떠한 활동",
          activityTypeEnumId: 2,
          startTerm: "2024-12-06T02:58:38.000Z",
          endTerm: "2024-12-17T02:58:49.000Z",
        },
      ],
    },
  ]);
});
