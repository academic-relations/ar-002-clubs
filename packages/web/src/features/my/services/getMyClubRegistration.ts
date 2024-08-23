import apiReg012 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockMyClubRegisterList } from "./_mock/mockMyClubRegisterDetail";

import type { ApiReg012ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg012";

export const useGetMyClubRegistration = () =>
  useQuery<ApiReg012ResponseOk, Error>({
    queryKey: [apiReg012.url()],

    queryFn: async (): Promise<ApiReg012ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg012.url(),
        {},
      );

      switch (status) {
        case 200:
          return apiReg012.responseBodyMap[200].parse(data);
        case 204:
          return { registrations: [] };
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg012.url()).reply(() => [200, mockMyClubRegisterList]);
});
