import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import { mockClubDelegates } from "./_mock/mockDelegate";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";

export const useGetClubDelegate = (requestParam: ApiClb006RequestParam) =>
  useQuery<ApiClb006ResponseOK, Error>({
    queryKey: [apiClb006.url(requestParam.clubId)],
    queryFn: async (): Promise<ApiClb006ResponseOK> => {
      const { data } = await axiosClientWithAuth.get(
        apiClb006.url(requestParam.clubId),
      );

      return apiClb006.responseBodyMap[200].parse(data);
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb006.url(1)).reply(() => [200, mockClubDelegates]);
});
