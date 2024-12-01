import apiSto004 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto004";
import { useQuery } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

import type { ApiSto004ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto004";

export const useGetStorageApplication = (applicationId: number) =>
  useQuery<ApiSto004ResponseOk, Error>({
    queryKey: [apiSto004.url(applicationId)],
    queryFn: async (): Promise<ApiSto004ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(
        apiSto004.url(applicationId),
      );

      // return apiSto004.responseBodyMap[200].parse(data);
      return data;
    },
  });
