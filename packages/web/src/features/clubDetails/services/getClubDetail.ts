import apiClb002 from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import mockupData from "@sparcs-clubs/web/features/clubDetails/services/_mock/mockupClubDetail";
import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

export const useGetClubDetail = (club_id: string) =>
  useQuery<ApiClb002ResponseOK, Error>({
    queryKey: [apiClb002.url(club_id)],
    queryFn: async (): Promise<ApiClb002ResponseOK> => {
      const { data, status } = await axiosClient.get(
        apiClb002.url(club_id),
        {},
      );

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiClb002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb002.url("1")).reply(() => {
    const dummy: z.infer<(typeof apiClb002.responseBodyMap)[200]> = mockupData;
    return [200, dummy];
  });
});
