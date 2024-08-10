import apiPrt005 from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupMyPrint } from "./_mock/mockMyClub";

import type {
  ApiPrt005RequestQuery,
  ApiPrt005ResponseOk,
} from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt005";

export const useGetMyPrinting = (
  startDate: Date,
  endDate: Date,
  pageOffset: number,
  itemCount: number,
) => {
  const requestQuery: ApiPrt005RequestQuery = {
    startDate,
    endDate,
    pageOffset,
    itemCount,
  };

  return useQuery<ApiPrt005ResponseOk, Error>({
    queryKey: [apiPrt005.url(), requestQuery],
    queryFn: async (): Promise<ApiPrt005ResponseOk> => {
      const { data, status } = await axiosClient.get(apiPrt005.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiPrt005.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiPrt005.url()).reply(() => [200, mockupMyPrint]);
});
