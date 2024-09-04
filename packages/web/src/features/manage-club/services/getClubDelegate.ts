import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
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
      const { data, status } = await axiosClientWithAuth.get(
        apiClb006.url(requestParam.clubId),
      );
      switch (status) {
        case 200:
        case 304:
          return apiClb006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb006.url(1)).reply(() => [200, mockClubDelegates]);
});
