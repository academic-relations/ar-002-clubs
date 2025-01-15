import apiClb016 from "@sparcs-clubs/interface/api/club/endpoint/apiClb016";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import mockMyClubList from "./_mock/mockMyClubList";

import type { ApiClb016ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb016";

const useGetMyClubProfessor = () =>
  useQuery<ApiClb016ResponseOk, Error>({
    queryKey: [apiClb016.url()],
    queryFn: async (): Promise<ApiClb016ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiClb016.url(), {});
      return data;
      // return apiClb016.responseBodyMap[200].parse(data);
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiClb016.url()).reply(() => [200, mockMyClubList]);
});

export default useGetMyClubProfessor;
