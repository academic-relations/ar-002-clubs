import apiClb009, {
  ApiClb009RequestParam,
  ApiClb009ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb009";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockAllSemesters } from "../frames/_mock/mockMembers";

export const useGetClubSemesters = (requestParam: ApiClb009RequestParam) =>
  useSuspenseQuery<ApiClb009ResponseOk, Error>({
    queryKey: [apiClb009.url(requestParam.clubId)],
    queryFn: async (): Promise<ApiClb009ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiClb009.url(requestParam.clubId),
      );
      switch (status) {
        case 200:
        case 304:
          return apiClb009.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock
    .onGet(apiClb009.url(1))
    .reply(() => [200, { semesters: mockAllSemesters }]);
});
