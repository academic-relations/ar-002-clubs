import apiAct028, {
  ApiAct028RequestParam,
  ApiAct028ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct028";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

const useGetExecutiveChargedActivities = (query: ApiAct028RequestParam) =>
  useQuery<ApiAct028ResponseOk, Error>({
    queryKey: ["executiveChargedActivities"], // 활동보고서 승인/반려 후 query invalidate를 위해 queryKey에 executiveId를 넣지 않음
    queryFn: async (): Promise<ApiAct028ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiAct028.url(query.executiveId),
        {},
      );

      return data;
    },
  });

export default useGetExecutiveChargedActivities;
