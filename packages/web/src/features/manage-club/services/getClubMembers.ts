import apiClb010, {
  ApiClb010RequestParam,
  ApiClb010ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb010";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockClubMembers } from "./_mock/mockManageClub";

const useGetClubMembers = (requestParam: ApiClb010RequestParam) =>
  useQuery<ApiClb010ResponseOk, Error>({
    queryKey: [apiClb010.url(requestParam.clubId, requestParam.semesterId)],
    queryFn: async (): Promise<ApiClb010ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiClb010.url(requestParam.clubId, requestParam.semesterId),
        {},
      );

      switch (status) {
        case 200:
          return apiClb010.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetClubMembers;

defineAxiosMock(mock => {
  mock.onGet(apiClb010.url(1, 1)).reply(() => [200, { mockClubMembers }]);
});
