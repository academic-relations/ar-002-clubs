import apiAct023, {
  ApiAct023ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct023";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

const useGetExecutiveActivities = () =>
  useQuery<ApiAct023ResponseOk, Error>({
    queryKey: [apiAct023.url()],
    queryFn: async (): Promise<ApiAct023ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiAct023.url(), {});

      return data;
    },
  });

export default useGetExecutiveActivities;
