import apiSto013 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto013";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiSto013ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto013";

export const useGetStorageContract = (contractId: number) =>
  useQuery<ApiSto013ResponseOk, Error>({
    queryKey: [apiSto013.url(contractId)],
    queryFn: async (): Promise<ApiSto013ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiSto013.url(contractId));

      // return apiSto013.responseBodyMap[200].parse(data);
      return data;
    },
  });
