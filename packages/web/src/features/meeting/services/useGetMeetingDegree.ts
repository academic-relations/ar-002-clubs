import apiMee005, {
  ApiMee005RequestQuery,
  ApiMee005ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee005";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useGetMeetingDegree = (query: ApiMee005RequestQuery) =>
  useQuery<ApiMee005ResponseOk, Error>({
    queryKey: [apiMee005.url()],
    queryFn: async (): Promise<ApiMee005ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(apiMee005.url(), {
        params: query,
      });

      switch (status) {
        case 200:
          return apiMee005.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetMeetingDegree;

defineAxiosMock(mock => {
  mock.onGet(apiMee005.url()).reply(() => [200, { degree: 100 }]);
});
