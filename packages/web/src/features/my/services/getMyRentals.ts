import apiRnt006 from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt006";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupMyRental } from "./_mock/mockMyClub";

import type {
  ApiRnt006RequestQuery,
  ApiRnt006ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt006";

export const useGetMyRentals = (
  startDate: Date,
  endDate: Date,
  pageOffset: number,
  itemCount: number,
) => {
  const requestQuery: ApiRnt006RequestQuery = {
    startDate,
    endDate,
    pageOffset,
    itemCount,
  };

  return useQuery<ApiRnt006ResponseOK, Error>({
    queryKey: [apiRnt006.url(), requestQuery],
    queryFn: async (): Promise<ApiRnt006ResponseOK> => {
      const { data, status } = await axiosClient.get(apiRnt006.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiRnt006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiRnt006.url()).reply(() => [200, mockupMyRental]);
});
