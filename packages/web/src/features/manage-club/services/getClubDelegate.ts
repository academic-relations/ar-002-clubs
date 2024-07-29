import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";

export const useGetClubDelegate = (requestParam: ApiClb006RequestParam) =>
  useQuery<ApiClb006ResponseOK, Error>({
    queryKey: [apiClb006.url(requestParam.clubId)],
    queryFn: async (): Promise<ApiClb006ResponseOK> => {
      const { data, status } = await axiosClient.get(
        apiClb006.url(requestParam.clubId),
      );
      switch (status) {
        case 200:
          return apiClb006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
