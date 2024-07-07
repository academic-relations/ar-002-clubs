import apiCms001 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockupCommonSpaces from "./_mock/mockupCommonSpaces";

import type { ApiCms001ResponseOK } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";

export const useGetCommonSpaces = () =>
  useQuery<ApiCms001ResponseOK, Error>({
    queryKey: [apiCms001.url()],
    queryFn: async (): Promise<ApiCms001ResponseOK> => {
      const { data, status } = await axiosClient.get(apiCms001.url(), {});

      switch (status) {
        case 200:
          return apiCms001.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiCms001.url()).reply(() => [200, mockupCommonSpaces]);
});

export default useGetCommonSpaces;
