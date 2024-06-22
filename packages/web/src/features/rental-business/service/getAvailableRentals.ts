import apiRnt001 from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";
import { useQuery } from "@tanstack/react-query";

import mockupAvailableRental from "@sparcs-clubs/web/features/rental-business/service/_mock/mockAvailableRental";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiRnt001RequestQuery,
  ApiRnt001ResponseOK,
} from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt001";

export const useGetAvailableRentals = (startDate: Date, endDate: Date) => {
  const requestQuery: ApiRnt001RequestQuery = { startDate, endDate };

  return useQuery<ApiRnt001ResponseOK, Error>({
    queryKey: [apiRnt001.url(), requestQuery],
    queryFn: async (): Promise<ApiRnt001ResponseOK> => {
      const { data, status } = await axiosClient.get(apiRnt001.url(), {
        params: requestQuery,
      });

      switch (status) {
        case 200:
          return apiRnt001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });
};

defineAxiosMock(mock => {
  mock.onGet(apiRnt001.url()).reply(() => [200, mockupAvailableRental]);
});
