import apiAct010, {
  ApiAct010RequestQuery,
  ApiAct010ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct010";

import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

const useGetParticipants = (requestQuery: ApiAct010RequestQuery) =>
  useQuery<ApiAct010ResponseOk, Error>({
    queryKey: [apiAct010.url()],
    queryFn: async (): Promise<ApiAct010ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiAct010.url(), {
        params: requestQuery,
      });

      if (data.total === 0 && data.items.length === 0 && data.offset)
        // items = []일 때 isError = true 방지
        return data;
      return apiAct010.responseBodyMap[200].parse(data);
    },
  });

export default useGetParticipants;
