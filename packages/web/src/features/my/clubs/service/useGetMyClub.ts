import apiClb003 from "@sparcs-clubs/interface/api/club/endpoint/apiClb003";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockMyClubList from "./_mock/mockMyClubList";

import type { ApiClb003ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb003";

const useGetMyClub = () =>
  useQuery<ApiClb003ResponseOK, Error>({
    queryKey: [apiClb003.url()],
    queryFn: async (): Promise<ApiClb003ResponseOK> => {
      const { data, status } = await axiosClient.get(apiClb003.url(), {});

      // Possible exceptions: UnexpectedAPIResponseError, ZodError, LibAxiosError
      switch (status) {
        case 200:
          return apiClb003.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb003.url()).reply(() => {
    const dummy: ApiClb003ResponseOK = mockMyClubList;
    return [200, dummy];
  });
});

export default useGetMyClub;
