import apiSto012 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";
import { useQuery } from "@tanstack/react-query";

import mockupStorage from "@sparcs-clubs/web/features/executive/storage/_mock/mockStorage";
import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiSto012RequestQuery,
  ApiSto012ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto012";

export const useGetStorageApplications = (
  requestQuery: ApiSto012RequestQuery,
) =>
  useQuery<ApiSto012ResponseOk, Error>({
    queryKey: [apiSto012.url(), requestQuery],
    queryFn: async (): Promise<ApiSto012ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiSto012.url(), {
        params: requestQuery,
      });

      // return apiSto012.responseBodyMap[200].parse(data);
      return data;
    },
  });

defineAxiosMock(mock => {
  mock
    .onGet(apiSto012.url(), { pageOffset: 1, itemCount: 10 })
    .reply(() => [200, mockupStorage]);
});
