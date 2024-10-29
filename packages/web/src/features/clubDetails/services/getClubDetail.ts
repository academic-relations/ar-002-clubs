import apiClb002 from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { useQuery } from "@tanstack/react-query";

import mockupData from "@sparcs-clubs/web/features/clubDetails/services/_mock/mockupClubDetail";
import { axiosClient, defineAxiosMock } from "@sparcs-clubs/web/lib/axios";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

export const useGetClubDetail = (clubId: string) =>
  useQuery<ApiClb002ResponseOK, Error>({
    queryKey: [apiClb002.url(clubId)],
    queryFn: async (): Promise<ApiClb002ResponseOK> => {
      const { data } = await axiosClient.get(apiClb002.url(clubId), {});

      // return apiClb002.responseBodyMap[200].parse(data);
      return data;
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb002.url("1")).reply(() => [200, mockupData]);
});
