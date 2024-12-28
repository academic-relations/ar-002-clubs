import apiAct019, {
  ApiAct019RequestQuery,
  ApiAct019ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct019";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import { mockProfessorActivityReportData } from "../_mock/professor";

const useProfessorGetCurrentActivityReportList = (
  query: ApiAct019RequestQuery,
) =>
  useQuery<ApiAct019ResponseOk, Error>({
    queryKey: [apiAct019.url(), query.clubId],
    queryFn: async (): Promise<ApiAct019ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiAct019.url(), {
        params: query,
      });

      // return apiAct019.responseBodyMap[200].parse(data);
      return data;
    },
  });

export default useProfessorGetCurrentActivityReportList;

defineAxiosMock(mock => {
  mock
    .onGet(apiAct019.url())
    .reply(() => [200, mockProfessorActivityReportData as ApiAct019ResponseOk]);
});
