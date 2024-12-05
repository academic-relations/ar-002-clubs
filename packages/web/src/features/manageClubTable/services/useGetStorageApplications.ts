import apiSto002 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";
import { useQuery } from "@tanstack/react-query";

import mockupStorage from "@sparcs-clubs/web/features/executive/storage/_mock/mockStorage";
import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiSto002RequestQuery,
  ApiSto002ResponseOk,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";

export const useGetStorageApplications = (
  requestQuery: ApiSto002RequestQuery,
) =>
  useQuery<ApiSto002ResponseOk, Error>({
    queryKey: [apiSto002.url(), requestQuery],
    queryFn: async (): Promise<ApiSto002ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiSto002.url(), {
        params: requestQuery,
      });

      // return apiSto002.responseBodyMap[200].parse(data);
      return data;
    },
  });

defineAxiosMock(mock => {
  mock
    .onGet(apiSto002.url(), { pageOffset: 1, itemCount: 10 })
    .reply(() => [200, mockupStorage]);
});
