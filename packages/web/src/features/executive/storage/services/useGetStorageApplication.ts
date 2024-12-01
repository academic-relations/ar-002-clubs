import apiSto005 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto005";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiSto005ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto005";

export const useGetStorageApplication = (applicationId: number) =>
  useQuery<ApiSto005ResponseOk, Error>({
    queryKey: [apiSto005.url(applicationId)],
    queryFn: async (): Promise<ApiSto005ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiSto005.url(applicationId),
      );

      // return apiSto005.responseBodyMap[200].parse(data);
      return data;
    },
  });
