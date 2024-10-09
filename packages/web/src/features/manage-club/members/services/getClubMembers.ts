import apiClb010, {
  ApiClb010RequestParam,
  ApiClb010ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb010";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockSemesterMembers } from "../frames/_mock/mockMembers";

export const useGetClubMembers = (requestParam: ApiClb010RequestParam) =>
  useSuspenseQuery<ApiClb010ResponseOk, Error>({
    queryKey: [apiClb010.url(requestParam.clubId, requestParam.semesterId)],
    queryFn: async (): Promise<ApiClb010ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiClb010.url(requestParam.clubId, requestParam.semesterId),
      );
      switch (status) {
        case 200:
        case 304:
          return data;
        // return apiClb010.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock
    .onGet(apiClb010.url(1, 15))
    .reply(() => [200, { members: mockSemesterMembers }]);
});
