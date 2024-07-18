import apiAcf007 from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupMyAcf } from "./_mock/mockMyClub";

import type {
  ApiAcf007RequestQuery,
  ApiAcf007ResponseOk,
} from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf007";

export const useGetMyActivityCertificate = (
  startDate: Date,
  endDate: Date,
  pageOffset: number,
  itemCount: number,
) => {
  const requestQuery: ApiAcf007RequestQuery = {
    startDate,
    endDate,
    pageOffset,
    itemCount,
  };

  return useQuery<ApiAcf007ResponseOk, Error>({
    queryKey: [apiAcf007.url(), requestQuery],
    queryFn: async (): Promise<ApiAcf007ResponseOk> => {
      const { data, status } = await axiosClient.get(apiAcf007.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiAcf007.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiAcf007.url()).reply(() => [200, mockupMyAcf]);
});
