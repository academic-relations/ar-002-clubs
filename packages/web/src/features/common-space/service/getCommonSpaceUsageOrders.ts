import {
  axiosClient,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";
import apiCms002 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

import type {
  ApiCms002RequestParam,
  ApiCms002RequestQuery,
  ApiCms002ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";
import { useQuery } from "@tanstack/react-query";

export const useGetCommonSpaceUsageOrders = (
  requestParam: ApiCms002RequestParam,
  requestQuery: ApiCms002RequestQuery,
) =>
  useQuery<ApiCms002ResponseOK, Error>({
    queryKey: [apiCms002.url(requestParam.spaceId), requestQuery],
    queryFn: async (): Promise<ApiCms002ResponseOK> => {
      const { data, status } = await axiosClient.get(
        apiCms002.url(requestParam.spaceId),
        { params: requestQuery },
      );

      switch (status) {
        case 200:
          return apiCms002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetCommonSpaceUsageOrders;
