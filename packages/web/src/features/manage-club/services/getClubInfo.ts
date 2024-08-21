import apiClb004 from "@sparcs-clubs/interface/api/club/endpoint/apiClb004";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockClubDescription } from "./_mock/mockManageClub";

import type {
  ApiClb004RequestParam,
  ApiClb004ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb004";

export const useGetClubInfo = (requestParam: ApiClb004RequestParam) =>
  useQuery<ApiClb004ResponseOK, Error>({
    queryKey: [apiClb004.url(requestParam.clubId)],
    queryFn: async (): Promise<ApiClb004ResponseOK> => {
      const { data, status } = await axiosClient.get(
        apiClb004.url(requestParam.clubId),
      );
      switch (status) {
        case 200: {
          return apiClb004.responseBodyMap[200].parse(data);
        }
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb004.url(1)).reply(() => [200, mockClubDescription]);
});