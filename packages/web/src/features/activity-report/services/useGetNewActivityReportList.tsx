import apiAct005, {
  ApiAct005RequestQuery,
  ApiAct005ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

export const newActivityReportListQueryKey = (clubId: number) => [
  apiAct005.url(),
  clubId,
];

const useGetNewActivityReportList = (query: ApiAct005RequestQuery) =>
  useQuery<ApiAct005ResponseOk, Error>({
    queryKey: newActivityReportListQueryKey(query.clubId),
    queryFn: async (): Promise<ApiAct005ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiAct005.url(), {
        params: query,
      });

      return apiAct005.responseBodyMap[200].parse(data);
    },
  });

export default useGetNewActivityReportList;

defineAxiosMock(mock => {
  mock.onGet(apiAct005.url()).reply(() => [
    200,
    [
      {
        id: 111,
        activityStatusEnumId: 1,
        name: "겨울학기 활동 테스트",
        activityTypeEnumId: 2,
        startTerm: "2024-12-06T02:58:38.000Z",
        endTerm: "2024-12-17T02:58:49.000Z",
      },
      {
        id: 112,
        activityStatusEnumId: 2,
        name: "겨울학기 활동 테스트",
        activityTypeEnumId: 1,
        startTerm: "2024-12-06T02:58:38.000Z",
        endTerm: "2024-12-17T02:58:49.000Z",
      },
      {
        id: 113,
        activityStatusEnumId: 3,
        name: "겨울학기 활동 테스트",
        activityTypeEnumId: 3,
        startTerm: "2024-12-06T02:58:38.000Z",
        endTerm: "2024-12-17T02:58:49.000Z",
      },
    ],
  ]);
});
