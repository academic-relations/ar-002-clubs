import apiSto009 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto009";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiSto009ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto009";

export const useGetStorageContract = (contractId: number) =>
  useQuery<ApiSto009ResponseOk, Error>({
    queryKey: [apiSto009.url(contractId)],
    queryFn: async (): Promise<ApiSto009ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiSto009.url(contractId));

      // return apiSto009.responseBodyMap[200].parse(data);
      return data;
    },
  });
