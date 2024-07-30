import apiClb008 from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiClb008RequestParam,
  ApiClb008ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";

export const useGetDelegateCandidates = (requestParam: ApiClb008RequestParam) =>
  useQuery<ApiClb008ResponseOk, Error>({
    queryKey: [apiClb008.url(requestParam.clubId, requestParam.delegateEnumId)],
    queryFn: async (): Promise<ApiClb008ResponseOk> => {
      const { data, status } = await axiosClient.get(
        apiClb008.url(requestParam.clubId, requestParam.delegateEnumId),
      );
      switch (status) {
        case 200:
          return apiClb008.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
