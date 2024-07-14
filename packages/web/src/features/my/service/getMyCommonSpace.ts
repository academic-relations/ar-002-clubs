import apiCms007 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupMyCms } from "./_mock/mockMyClub";

import type {
  ApiCms007RequestQuery,
  ApiCms007ResponseOk,
} from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms007";

export const useGetMyCommonSpace = (
  startDate: Date,
  endDate: Date,
  pageOffset: number,
  itemCount: number,
) => {
  const requestQuery: ApiCms007RequestQuery = {
    startDate,
    endDate,
    pageOffset,
    itemCount,
  };

  return useQuery<ApiCms007ResponseOk, Error>({
    queryKey: [apiCms007.url(), requestQuery],
    queryFn: async (): Promise<ApiCms007ResponseOk> => {
      const { data, status } = await axiosClient.get(apiCms007.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiCms007.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiCms007.url()).reply(() => [200, mockupMyCms]);
});
