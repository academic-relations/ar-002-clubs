import apiAct010, {
  ApiAct010RequestQuery,
  ApiAct010ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct010";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useGetParticipants = (requestQuery: ApiAct010RequestQuery) =>
  useQuery<ApiAct010ResponseOk, Error>({
    queryKey: [apiAct010.url()],
    queryFn: async (): Promise<ApiAct010ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(apiAct010.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
        case 304:
          if (data.total === 0 && data.items.length === 0 && data.offset)
            // items = []일 때 isError = true 방지
            return data;
          return apiAct010.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetParticipants;
