import apiCms002 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockUsageOrders } from "./_mock/mockupCommonSpaceUsageOrders";

import type {
  ApiCms002RequestParam,
  ApiCms002RequestQuery,
  ApiCms002ResponseOK,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

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

defineAxiosMock(mock => {
  // Base URL for your API
  const baseUrl = apiCms002.url(1); // Assuming this returns something like '/api/resource/1'

  // Use a regular expression to match the URL with any additional params
  mock
    .onGet(new RegExp(`^${baseUrl}(/|$)`))
    .reply(() => [200, mockUsageOrders]);
});

export default useGetCommonSpaceUsageOrders;
