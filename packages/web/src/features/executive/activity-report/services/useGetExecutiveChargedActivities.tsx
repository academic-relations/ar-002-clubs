import apiAct028, {
  ApiAct028RequestParam,
  ApiAct028ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct028";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

const useGetExecutiveChargedActivities = (query: ApiAct028RequestParam) =>
  useQuery<ApiAct028ResponseOk, Error>({
    queryKey: [apiAct028.url(query.executiveId)],
    queryFn: async (): Promise<ApiAct028ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiAct028.url(query.executiveId),
        {},
      );

      return data;
    },
  });

export default useGetExecutiveChargedActivities;
